import { MapPin, Search, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = () => {
    const trimmed = searchTerm.trim();

    if (!trimmed) {
      navigate('/products');
      return;
    }

    navigate(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <nav className="bg-[#131921] text-white">
      <div className="px-3 sm:px-4 lg:px-6 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/" className="flex items-center shrink-0">
            <div className="text-lg sm:text-2xl font-bold px-2 sm:px-3 py-2 hover:outline outline-1 outline-white rounded-sm transition">
              <span className="text-white">shop</span>
              <span className="text-orange-400">.com</span>
            </div>
          </Link>

          <button className="hidden md:flex items-center gap-1 px-3 py-2 hover:outline outline-1 outline-white rounded-sm transition shrink-0">
            <MapPin className="w-5 h-5" />
            <div className="flex flex-col items-start text-xs">
              <span className="text-gray-300 text-[11px]">Deliver to</span>
              <span className="font-bold text-sm">New York 10001</span>
            </div>
          </button>

          <div className="order-3 w-full md:order-none md:flex-1 flex items-stretch">
            <select className="bg-gray-200 text-gray-800 px-2 sm:px-4 py-2.5 rounded-l-md border-none outline-none text-sm cursor-pointer hover:bg-gray-300 transition font-medium">
              <option>All</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
              <option>Sports</option>
            </select>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="Search for products, brands and more..."
              className="flex-1 min-w-0 px-4 py-2.5 bg-white text-black outline-none text-sm placeholder:text-gray-500"
            />

            <button
              onClick={handleSearch}
              className="bg-orange-400 hover:bg-orange-500 px-3 sm:px-5 py-2.5 rounded-r-md transition"
            >
              <Search className="w-5 h-5 text-gray-900" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 ml-auto shrink-0">
            <div className="hidden sm:flex flex-col items-start px-2 sm:px-3 py-2 hover:outline outline-1 outline-white rounded-sm transition">
              {isAuthenticated ? (
                <>
                  <span className="text-xs text-gray-300">
                    Hello, {user?.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-bold text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="flex flex-col items-start"
                >
                  <span className="text-xs text-gray-300">Hello, sign in</span>
                  <span className="text-sm font-bold">Account</span>
                </button>
              )}
            </div>

            <button
              onClick={() => navigate('/orders')}
              className="hidden sm:flex flex-col items-start px-2 sm:px-3 py-2 hover:outline outline-1 outline-white rounded-sm transition"
            >
              <span className="text-xs text-gray-300">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 hover:outline outline-1 outline-white rounded-sm transition relative"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 left-3 sm:left-4 bg-orange-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-bold hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}