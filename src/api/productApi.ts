import type { Product } from '../types/product';

const BASE_URL = 'http://127.0.0.1:8000/api/products';

// 🔹 Get all products
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

// 🔹 Get single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  const response = await fetch(`${BASE_URL}/${id}/`);

  if (!response.ok) {
    if (response.status === 404) return undefined;
    throw new Error('Failed to fetch product');
  }

  return response.json();
}

// 🔹 Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const url =
    !category || category.toLowerCase() === 'all'
      ? `${BASE_URL}/`
      : `${BASE_URL}/?category=${category.toLowerCase()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch category products');
  }

  return response.json();
}