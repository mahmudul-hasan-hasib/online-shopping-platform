import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export function ProductListing() {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  // Update selected category when URL changes
  useEffect(() => {
  setSelectedCategory(category || '');
}, [category]);

  // Get unique categories and brands
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];
  const brands = Array.from(
    new Set(products.map((p) => p.name.split(' ')[0]))
  ).slice(0, 8);

  // Filter products
  let filteredProducts = products;

  if (selectedCategory && selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedBrands.some((brand) => p.name.includes(brand))
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
  };

  return (
    <div className="min-h-screen bg-[#eaeded]">
      <div className="max-w-[1920px] mx-auto px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Clear all
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-sm text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600 transition"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat || (!selectedCategory && cat === 'All')}
                        onChange={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                        className="w-4 h-4 text-orange-400 cursor-pointer"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-sm text-gray-900 mb-3">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600 transition"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="w-4 h-4 text-orange-400 cursor-pointer"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              {/* Price Range Filter */}
              <div className="mb-4">
                <h3 className="font-bold text-sm text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Min: ${priceRange[0]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full accent-orange-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Max: ${priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full accent-orange-400"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Side - Product Grid */}
          <div className="flex-1">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory || 'All Products'}
              </h1>
              <p className="text-gray-600">{filteredProducts.length} results</p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  No products found
                </h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or browse other categories
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}