import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full min-h-[360px] sm:min-h-[420px] group overflow-hidden"
    >
      <div className="p-3 sm:p-4 flex flex-col h-full">
        <div className="relative mb-3 overflow-hidden rounded-md h-36 sm:h-44 md:h-48 flex-shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
              isOutOfStock ? 'opacity-60' : ''
            }`}
          />

          {isOutOfStock && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-semibold mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition min-h-[40px] sm:min-h-[48px]">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2 flex-wrap">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-orange-400 text-orange-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600">
            ({product.reviews})
          </span>
        </div>

        <div className="mb-2">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p
          className={`text-xs sm:text-sm font-semibold mb-3 ${
            isOutOfStock ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2.5 px-3 sm:px-4 rounded-md font-bold transition flex items-center justify-center gap-2 mt-auto text-sm sm:text-base ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isAdding
              ? 'bg-green-500 text-white'
              : 'bg-orange-400 hover:bg-orange-500 text-gray-900'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isOutOfStock ? 'Out of Stock' : isAdding ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}