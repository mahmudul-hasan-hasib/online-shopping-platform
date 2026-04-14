import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SecondaryNav() {
  const categories = [
    { name: "Today's Deals", path: '/products' },
    { name: 'Electronics', path: '/products/Electronics' },
    { name: 'Fashion', path: '/products/Fashion' },
    { name: 'Home & Garden', path: '/products/Home' },
    { name: 'Sports & Outdoors', path: '/products/Sports' },
  ];

  return (
    <div className="bg-[#232f3e] text-white">
      <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 text-sm overflow-x-auto scrollbar-hide">

        {/* All button */}
        <Link
          to="/products"
          className="flex items-center gap-2 font-bold hover:outline outline-1 outline-white px-2 py-1 rounded-sm transition whitespace-nowrap shrink-0"
        >
          <Menu className="w-5 h-5" />
          <span className="hidden sm:inline">All</span>
        </Link>

        {/* Categories */}
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.path}
            className="hover:outline outline-1 outline-white px-2 py-1 rounded-sm whitespace-nowrap transition shrink-0"
          >
            {category.name}
          </Link>
        ))}

      </div>
    </div>
  );
}