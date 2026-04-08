import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';


export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#eaeded] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setTimeout(() => setIsAdding(false), 500);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="max-w-7xl mx-auto px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-orange-400 text-orange-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {product.reviews} reviews
                </span>
              </div>

              <hr className="my-4" />

              {/* Price */}
              <div className="mb-6">
                <span className="text-sm text-gray-600">Price:</span>
                <div className="text-4xl font-bold text-red-600">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">About this item</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <hr className="my-6" />

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">
                  Quantity:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-4 py-2 text-gray-900 cursor-pointer"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition flex items-center justify-center gap-3 ${
                  isAdding
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-400 hover:bg-orange-500 text-gray-900'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {isAdding ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              {/* Buy Now Button */}
              <button
                onClick={() => {
                  handleAddToCart();
                  setTimeout(() => navigate('/cart'), 600);
                }}
                className="w-full mt-3 py-3 px-6 rounded-lg font-bold text-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer p-4"
                >
                  <img
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="text-lg font-bold text-gray-900">
                    ${relatedProduct.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
