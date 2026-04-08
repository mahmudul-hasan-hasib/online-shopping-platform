import { products } from '../app/data/products';
import type { Product } from '../types/product';

export async function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return Promise.resolve(products.find((p) => p.id === id));
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (!category || category === 'All') {
    return Promise.resolve(products);
  }

  return Promise.resolve(
    products.filter((p) => p.category === category)
  );
}