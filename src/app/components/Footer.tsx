import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#232f3e] text-white">
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[#37475a] hover:bg-[#495d75] py-4 text-sm font-bold transition"
      >
        Back to top
      </button>

      {/* Main Footer Content */}
      <div className="bg-[#232f3e] py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-bold text-base mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link to="#" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Press Releases
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Shop.com Science
                  </Link>
                </li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div>
              <h3 className="font-bold text-base mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link to="#" className="hover:underline">
                    Sell on shop.com
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Become an Affiliate
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Advertise Your Products
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Self-Publish with Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div>
              <h3 className="font-bold text-base mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link to="/login" className="hover:underline">
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Your Orders
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Shipping Rates & Policies
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Returns & Replacements
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Help
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shop by Category */}
            <div>
              <h3 className="font-bold text-base mb-4">Shop by Category</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link to="/products/Electronics" className="hover:underline">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link to="/products/Fashion" className="hover:underline">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link to="/products/Home" className="hover:underline">
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link to="/products/Sports" className="hover:underline">
                    Sports & Outdoors
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#131921] py-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Logo and Social */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-white">shop</span>
                <span className="text-orange-400">.com</span>
              </div>
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="bg-[#37475a] hover:bg-[#495d75] p-2 rounded-full transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-[#37475a] hover:bg-[#495d75] p-2 rounded-full transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-[#37475a] hover:bg-[#495d75] p-2 rounded-full transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-[#37475a] hover:bg-[#495d75] p-2 rounded-full transition"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="text-center text-sm text-gray-400">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Link to="#" className="hover:underline">
                Conditions of Use
              </Link>
              <Link to="#" className="hover:underline">
                Privacy Notice
              </Link>
              <Link to="#" className="hover:underline">
                Your Ads Privacy Choices
              </Link>
            </div>
            <p>© 2026 shop.com, Inc. or its affiliates</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
