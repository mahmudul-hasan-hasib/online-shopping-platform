import { CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function OrderSuccessPage() {
  const navigate = useNavigate();

  const mockOrderId = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-[#eaeded] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-md p-10 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 text-lg mb-2">
          Thank you for your purchase.
        </p>

        <p className="text-gray-600 mb-6">
          Your order has been confirmed and is now being processed.
        </p>

        <div className="bg-gray-50 border rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <p className="text-xl font-bold text-gray-900">{mockOrderId}</p>
        </div>

        <div className="space-y-3 text-sm text-gray-600 mb-8">
          <p>✔ A confirmation email will be sent soon.</p>
          <p>✔ You will be able to track your order once shipping starts.</p>
          <p>✔ Estimated delivery details will be available later.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
          >
            Continue Shopping
          </button>

          <Link
            to="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-md font-bold transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}