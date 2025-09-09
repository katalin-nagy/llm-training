import React from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ items }) => {
  const total = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 bg-white rounded-xl border shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Cart</h3>
        <span className="text-sm text-gray-500">
          {count} item{count !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="max-h-56 overflow-auto divide-y">
        {items.length === 0 && (
          <p className="text-sm text-gray-500 py-2">Your cart is empty.</p>
        )}
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="py-2 flex items-center justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
            </div>
            <span className="text-sm">× {quantity}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-gray-600">Total</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;
