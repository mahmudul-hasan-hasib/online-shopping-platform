import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const total = getCartTotal();

  const hasOutOfStockItem = cart.some((item) => item.stock <= 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#eaeded] flex items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-md">
          <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {cart.map((item) => {
                const isOutOfStock = item.stock <= 0;

                return (
                  <div
                    key={item.id}
                    className="p-6 border-b last:border-b-0 flex gap-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className={`w-32 h-32 object-cover rounded-md cursor-pointer hover:opacity-80 transition ${
                        isOutOfStock ? 'opacity-60' : ''
                      }`}
                      onClick={() => navigate(`/product/${item.id}`)}
                    />

                    <div className="flex-1">
                      <h3
                        className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-2">
                        Category: {item.category}
                      </p>

                      <div className="text-xl font-bold text-gray-900 mb-2">
                        ${item.price.toFixed(2)}
                      </div>

                      <p
                        className={`text-sm font-semibold mb-4 ${
                          isOutOfStock ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {isOutOfStock
                          ? 'Out of Stock'
                          : `In Stock (${item.stock} available)`}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 hover:bg-gray-100 transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="px-4 py-1 border-x border-gray-300">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.min(item.quantity + 1, Math.max(item.stock, 1))
                              )
                            }
                            disabled={isOutOfStock || item.quantity >= item.stock}
                            className="px-3 py-1 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>

                      {!isOutOfStock && item.quantity >= item.stock && (
                        <p className="text-xs text-orange-600 mt-2 font-medium">
                          Maximum available quantity reached
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>
                    Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {hasOutOfStockItem && (
                <div className="mb-4 rounded-md bg-red-100 text-red-700 px-4 py-3 text-sm font-medium">
                  Some items in your cart are out of stock. Remove them before checkout.
                </div>
              )}

              <button
                onClick={() => navigate('/checkout')}
                disabled={hasOutOfStockItem}
                className={`w-full py-3 px-6 rounded-md font-bold transition mb-3 ${
                  hasOutOfStockItem
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-400 hover:bg-orange-500 text-white'
                }`}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/products')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 px-6 rounded-md font-bold transition mb-3"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
                className="w-full text-red-600 hover:text-red-800 py-2 text-sm font-semibold transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}