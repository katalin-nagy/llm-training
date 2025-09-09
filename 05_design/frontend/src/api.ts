import { Product } from './types/Product';

const API_URL = 'http://localhost:8000';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products/`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
  return response.json();
};

export const updateProduct = async (id: number, product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/products/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};

export const addToCart = async (productId: number, quantity: number) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg || 'Failed to add to cart');
  }
  return response.json() as Promise<{
    cart: Record<number, number>;
    remaining_stock: Record<number, number>;
  }>;
};

export const getCart = async () => {
  const response = await fetch(`${API_URL}/cart`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json() as Promise<Record<number, number>>;
};
