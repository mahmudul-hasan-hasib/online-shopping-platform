import { Package, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../../api/orderApi';

type OrderItem = {
  id: number;
  product_name: string;
  product_price: string | number;
  quantity: number;
  line_total: string | number;
};

type OrderUser = {
  id: number;
  username: string;
  email: string;
} | null;

type Order = {
  id: number;
  user: OrderUser;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  subtotal: string | number;
  shipping_fee: string | number;
  total_amount: string | number;
  status: string;
  created_at: string;
  items: OrderItem[];
};

function formatPrice(value: string | number) {
  return Number(value).toFixed(2);
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'paid':
      return 'bg-blue-100 text-blue-700';
    case 'shipped':
      return 'bg-purple-100 text-purple-700';
    case 'delivered':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function OrdersPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError('');

        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
          setError('You need to log in to view your orders.');
          return;
        }

        const data = await getMyOrders(accessToken);
        setOrders(data);
      } catch (err: any) {
        console.error('Failed to load orders:', err);

        if (err?.detail) {
          setError(err.detail);
        } else {
          setError('Failed to load your orders.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eaeded] flex items-center justify-center py-8 sm:py-12 px-4">
  <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 max-w-2xl w-full text-center">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Loading your orders...</h2>
  </div>
</div>
);
}

if (error) {
  return (
    <div className="min-h-screen bg-[#eaeded] flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-10 text-center max-w-lg w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Could not load orders</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">{error}</p>
        <button
          onClick={() => navigate('/login')}
          className="w-full sm:w-auto bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

if (orders.length === 0) {
  return (
    <div className="min-h-screen bg-[#eaeded] flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-10 text-center max-w-lg w-full">
        <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-6" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          You haven&apos;t placed any orders yet. Start shopping to see your orders here.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="w-full sm:w-auto bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
        >
          Browse Products
        </button>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-[#eaeded] py-6 sm:py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600 text-sm sm:text-base">Track your recent purchases and order details.</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b bg-gray-50 px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Order ID</p>
                  <p className="font-bold text-gray-900 break-words">#{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Placed On</p>
                  <p className="font-semibold text-gray-900 break-words">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-bold text-gray-900">${formatPrice(order.total_amount)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusClasses(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

              <div className="p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                  Ordered Items
                </h2>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base break-words">{item.product_name}</h3>
                        <p className="text-sm text-gray-600">
                          Unit Price: ${formatPrice(item.product_price)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xs sm:text-sm text-gray-500">Line Total</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">
                          ${formatPrice(item.line_total)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Shipping Address</h3>
                    <p className="text-gray-700 text-sm break-words">{order.full_name}</p>
                    <p className="text-gray-700 text-sm break-words">{order.address}</p>
                    <p className="text-gray-700 text-sm break-words">
                      {order.city}, {order.postal_code}, {order.country}
                    </p>
                    <p className="text-gray-700 mt-2">{order.phone}</p>
                    <p className="text-gray-700 text-sm break-words">{order.email}</p>
                  </div>

                  <div className="md:text-right">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Order Summary</h3>
                    <p className="text-gray-700 text-sm break-words">Subtotal: ${formatPrice(order.subtotal)}</p>
                    <p className="text-gray-700 text-sm break-words">
                      Shipping: ${formatPrice(order.shipping_fee)}
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 mt-2">
                      Total: ${formatPrice(order.total_amount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}