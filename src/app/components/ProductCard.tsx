  import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, useCart } from '../context/CartContext';

  interface ProductCardProps {
    product: Product;
  }

  export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsAdding(true);
      addToCart(product);
      setTimeout(() => setIsAdding(false), 500);
    };

    return (
      <Link
        to={`/product/${product.id}`}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-[420px] group"
      >
        <div className="p-4 flex flex-col h-full">
          {/* Product Image */}
          <div className="relative mb-3 overflow-hidden rounded-md h-48 flex-shrink-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition h-12">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-orange-400 text-orange-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="mb-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-md font-bold transition flex items-center justify-center gap-2 mt-auto ${
              isAdding
                ? 'bg-green-500 text-white'
                : 'bg-orange-400 hover:bg-orange-500 text-gray-900'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </Link>
    );
  }