import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../../api/orderApi';
import type { CheckoutFormData } from '../../types/order';
import { useCart } from '../context/CartContext';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Bangladesh',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const subtotal = getCartTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      setSubmitError('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const accessToken = localStorage.getItem('access_token');

      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        country: formData.country || 'Bangladesh',
        items: cart.map((item) => ({
          product_id: Number(item.id),
          quantity: item.quantity,
        })),
      };

      const result = await placeOrder(payload, accessToken || undefined);

      clearCart();

      navigate('/order-success', {
        state: {
          order: result.order,
        },
      });
    } catch (error: any) {
      console.error('Failed to place order:', error);

      if (error?.items?.[0]) {
        setSubmitError(error.items[0]);
      } else if (error?.detail) {
        setSubmitError(error.detail);
      } else if (error?.message) {
        setSubmitError(error.message);
      } else if (typeof error === 'string') {
        setSubmitError(error);
      } else {
        setSubmitError('Something went wrong while placing the order.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#eaeded] flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-10 text-center max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products before going to checkout.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
          >
            Go to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded] py-8">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form
              onSubmit={handlePlaceOrder}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>

              {submitError && (
                <div className="mb-4 rounded-md bg-red-100 text-red-700 px-4 py-3 text-sm font-medium">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter postal code"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter your country"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-md font-bold transition"
                >
                  Back to Cart
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-400 hover:bg-orange-500 disabled:opacity-70 text-white px-6 py-3 rounded-md font-bold transition"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-3"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
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

              <p className="text-xs text-gray-500 mt-4">
                Your order will be saved to the database after placing it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}