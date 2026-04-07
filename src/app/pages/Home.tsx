import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { HeroBanner } from '../components/HeroBanner';

export function Home() {
  const categories = [
    {
      title: 'Electronics & Gadgets',
      imageUrl: 'https://images.unsplash.com/photo-1680585499966-d73b4f54f127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBsYXB0b3B8ZW58MXx8fHwxNzczODM5NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      label: 'Up to 40% OFF',
      category: 'Electronics',
    },
    {
      title: 'Fashion Trends',
      imageUrl: 'https://images.unsplash.com/photo-1763771522867-c26bf75f12bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBhcHBhcmVsfGVufDF8fHx8MTc3MzgxMDUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      label: 'NEW ARRIVALS',
      category: 'Fashion',
    },
    {
      title: 'Home & Living',
      imageUrl: 'https://images.unsplash.com/photo-1702865071803-cb154cd45f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZnVybml0dXJlJTIwZGVjb3J8ZW58MXx8fHwxNzczODM3NjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      label: 'TOP RATED',
      category: 'Home',
    },
    {
      title: 'Sports & Fitness',
      imageUrl: 'https://images.unsplash.com/photo-1758875568468-194dfe762ba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmaXRuZXNzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MzgwODExMHww&ixlib=rb-4.1.0&q=80&w=1080',
      label: 'BEST SELLERS',
      category: 'Sports',
    },
  ];

  return (
    <div className="min-h-screen bg-[#eaeded]">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Category Cards - Properly positioned below banner */}
      <div className="relative px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                imageUrl={category.imageUrl}
                label={category.label}
                category={category.category}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Additional Content Space */}
      <div className="px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Discover More Categories</h2>
            <p className="text-gray-600 mb-6">
              Browse through thousands of products across multiple categories
            </p>
            <Link
              to="/products"
              className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
            >
              Explore All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}