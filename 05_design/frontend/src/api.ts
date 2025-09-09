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
