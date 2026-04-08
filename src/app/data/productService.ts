import { products } from './products';

export const getAllProducts = () => products;

export const getProductsByCategory = (category: string) => {
  if (!category || category === 'All') return products;
  return products.filter((p) => p.category === category);
};