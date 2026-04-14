import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/productApi';
import type { Product } from '../../types/product';
import { ProductCard } from '../components/ProductCard';

export function ProductListing() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category.toLowerCase() : ''
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = (searchParams.get('search') || '').toLowerCase().trim();

  useEffect(() => {
    setSelectedCategory(category ? category.toLowerCase() : '');
  }, [category]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProducts();
        setAllProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(allProducts.map((p) => p.category)))],
    [allProducts]
  );

  const brands = useMemo(
    () =>
      Array.from(new Set(allProducts.map((p) => p.name.split(' ')[0]))).slice(0, 8),
    [allProducts]
  );

  let filteredProducts = allProducts;

  if (selectedCategory && selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedBrands.some((brand) =>
        p.name.toLowerCase().includes(brand.toLowerCase())
      )
    );
  }

  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
    );
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eaeded] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-12 text-center w-full max-w-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Loading products...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#eaeded] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-12 text-center w-full max-w-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            {error}
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside
            className={`w-full lg:w-64 flex-shrink-0 ${
              showFilters ? 'block' : 'hidden'
            } lg:block`}
          >
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-4">
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
                        checked={
                          (cat === 'All' && !selectedCategory) ||
                          selectedCategory.toLowerCase() === cat.toLowerCase()
                        }
                        onChange={() => {
                          setSelectedCategory(cat === 'All' ? '' : cat);
                          if (window.innerWidth < 1024) setShowFilters(false);
                        }}
                        className="w-4 h-4 text-orange-400 cursor-pointer"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

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

              <div className="mb-4">
                <h3 className="font-bold text-sm text-gray-900 mb-3">
                  Price Range
                </h3>
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

          <div className="flex-1">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className="w-full bg-white rounded-lg shadow-md px-4 py-3 flex items-center justify-center gap-2 font-bold text-gray-900"
              >
                <SlidersHorizontal className="w-5 h-5" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 capitalize">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : selectedCategory || 'All Products'}
              </h1>
              <p className="text-gray-600">{filteredProducts.length} results</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-12 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  No products found
                </h2>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Try adjusting your filters or browse other categories
                </p>
                <button
                  onClick={clearFilters}
                  className="w-full sm:w-auto bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-bold transition"
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