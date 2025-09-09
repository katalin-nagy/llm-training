from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Dict

from database import Product, CartItem, get_db

router = APIRouter()

class AddToCartIn(BaseModel):
    product_id: int
    quantity: int

@router.post("/cart")
async def add_to_cart(payload: AddToCartIn, db: AsyncSession = Depends(get_db)):
    # Validate product
    result = await db.execute(select(Product).where(Product.id == payload.product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if payload.quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be positive")
    if product.stock is None or product.stock < payload.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")

    # Decrement product stock
    product.stock -= payload.quantity

    # Upsert cart item
    row = await db.execute(select(CartItem).where(CartItem.product_id == payload.product_id))
    cart_item = row.scalar_one_or_none()
    if cart_item:
        cart_item.quantity += payload.quantity
    else:
        cart_item = CartItem(product_id=payload.product_id, quantity=payload.quantity)
        db.add(cart_item)

    await db.commit()

    # Remaining stock map (just the updated product)
    remaining_stock = {payload.product_id: product.stock}

    # Return current cart as { productId: qty }
    all_rows = (await db.execute(select(CartItem))).scalars().all()
    cart = {r.product_id: r.quantity for r in all_rows}
    return {"cart": cart, "remaining_stock": remaining_stock}

@router.get("/cart")
async def get_cart(db: AsyncSession = Depends(get_db)):
    all_rows = (await db.execute(select(CartItem))).scalars().all()
    return {r.product_id: r.quantity for r in all_rows}
