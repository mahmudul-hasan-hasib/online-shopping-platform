import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, getProducts } from '../../api/productApi';
import type { Product } from '../../types/product';
import { useCart } from '../context/CartContext';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stockMessage, setStockMessage] = useState('');

  useEffect(() => {
    const loadProductDetails = async () => {
      if (!id) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const [foundProduct, allProducts] = await Promise.all([
          getProductById(id),
          getProducts(),
        ]);

        if (!foundProduct) {
          setProduct(undefined);
          setRelatedProducts([]);
          return;
        }

        setProduct(foundProduct);

        const related = allProducts
          .filter(
            (p) => p.category === foundProduct.category && p.id !== foundProduct.id
          )
          .slice(0, 4);

        setRelatedProducts(related);
      } catch {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  const existingCartItem = useMemo(() => {
    if (!product) return null;
    return cart.find((item) => item.id === product.id) || null;
  }, [cart, product]);

  const alreadyInCart = existingCartItem?.quantity || 0;
  const availableToAdd = product ? Math.max(product.stock - alreadyInCart, 0) : 0;
  const isOutOfStock = !product || availableToAdd <= 0;

  useEffect(() => {
    if (availableToAdd <= 0) {
      setQuantity(1);
      return;
    }

    if (quantity > availableToAdd) {
      setQuantity(availableToAdd);
    }
  }, [availableToAdd, quantity]);

  const handleAddToCart = () => {
    if (!product) return;

    if (availableToAdd <= 0) {
      setStockMessage('This product is already at maximum available quantity in your cart.');
      return;
    }

    const safeQuantity = Math.min(quantity, availableToAdd);

    addToCart(product, safeQuantity);
    setStockMessage('');

    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eaeded] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading product...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
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

  const maxSelectableQuantity = Math.min(availableToAdd, 10);

  return (
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="max-w-7xl mx-auto px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className={`w-full h-[500px] object-cover rounded-lg ${
                  isOutOfStock ? 'opacity-70' : ''
                }`}
              />
              {isOutOfStock && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded">
                  Out of Stock
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

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

              <div className="mb-3">
                <span className="text-sm text-gray-600">Price:</span>
                <div className="text-4xl font-bold text-red-600">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <p
                className={`font-semibold mb-2 ${
                  isOutOfStock ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {isOutOfStock
                  ? 'Out of Stock'
                  : `In Stock (${product.stock} total, ${availableToAdd} available to add)`}
              </p>

              {alreadyInCart > 0 && (
                <p className="text-sm text-orange-600 font-medium mb-4">
                  Already in cart: {alreadyInCart}
                </p>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">About this item</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <hr className="my-6" />

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Quantity:</label>
                <select
                  value={availableToAdd > 0 ? quantity : 1}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  disabled={isOutOfStock}
                  className="border border-gray-300 rounded-md px-4 py-2 text-gray-900 cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {availableToAdd > 0 ? (
                    [...Array(maxSelectableQuantity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))
                  ) : (
                    <option value={1}>1</option>
                  )}
                </select>
              </div>

              {stockMessage && (
                <div className="mb-4 rounded-md bg-red-100 text-red-700 px-4 py-3 text-sm font-medium">
                  {stockMessage}
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition flex items-center justify-center gap-3 ${
                  isOutOfStock
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isAdding
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-400 hover:bg-orange-500 text-gray-900'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {isOutOfStock
                  ? 'Out of Stock'
                  : isAdding
                  ? 'Added to Cart!'
                  : 'Add to Cart'}
              </button>

              <button
                onClick={() => {
                  if (isOutOfStock) return;
                  handleAddToCart();
                  setTimeout(() => navigate('/cart'), 600);
                }}
                disabled={isOutOfStock}
                className={`w-full mt-3 py-3 px-6 rounded-lg font-bold text-lg transition ${
                  isOutOfStock
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                }`}
              >
                {isOutOfStock ? 'Unavailable' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedOutOfStock = relatedProduct.stock <= 0;

                return (
                  <div
                    key={relatedProduct.id}
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer p-4"
                  >
                    <div className="relative">
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className={`w-full h-40 object-cover rounded-md mb-3 ${
                          relatedOutOfStock ? 'opacity-60' : ''
                        }`}
                      />
                      {relatedOutOfStock && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="text-lg font-bold text-gray-900">
                      ${relatedProduct.price.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}