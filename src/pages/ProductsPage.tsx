import { useEffect, useState } from 'react';
import { Filter, Star, Heart, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface ProductsPageProps {
  onNavigate: (page: string) => void;
  searchParams?: URLSearchParams;
}

export const ProductsPage = ({ onNavigate, searchParams }: ProductsPageProps) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchParams) {
      const occasion = searchParams.get('occasion');
      if (occasion) setSelectedOccasion(occasion);
    }
    fetchProducts();
  }, [searchParams, sortBy, selectedOccasion]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*, images:product_images(*), category:categories(*)')
      .eq('is_active', true);

    if (selectedOccasion) {
      query = query.contains('occasion', [selectedOccasion]);
    }

    if (sortBy === 'price_asc') {
      query = query.order('final_price', { ascending: true });
    } else if (sortBy === 'price_desc') {
      query = query.order('final_price', { ascending: false });
    } else if (sortBy === 'popularity') {
      query = query.order('rating_count', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data } = await query;

    if (data) {
      const filtered = data.filter(
        (p) => p.final_price >= priceRange[0] && p.final_price <= priceRange[1]
      );
      setProducts(filtered as Product[]);
    }
    setLoading(false);
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      alert('Please sign in to add to wishlist');
      return;
    }

    const { data: existing } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing) {
      await supabase.from('wishlist').delete().eq('id', existing.id);
    } else {
      await supabase.from('wishlist').insert({
        user_id: user.id,
        product_id: productId,
      });
    }
  };

  const occasions = ['Valentine', 'Anniversary', 'Birthday', 'Just Because', 'Wedding'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Gifts</h1>
            <p className="text-gray-600">{products.length} products found</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-200"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block space-y-6 bg-white p-6 rounded-xl border border-gray-200 h-fit`}
          >
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-rose-500"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Occasion
                  </label>
                  <div className="space-y-2">
                    {occasions.map((occasion) => (
                      <button
                        key={occasion}
                        onClick={() =>
                          setSelectedOccasion(selectedOccasion === occasion ? '' : occasion)
                        }
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedOccasion === occasion
                            ? 'bg-rose-50 text-rose-600 border-2 border-rose-500'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {occasion}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setSelectedOccasion('');
                  }}
                  className="w-full px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </aside>

          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="newest">Newest</option>
                  <option value="popularity">Most Popular</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative">
                      <button
                        onClick={() => onNavigate(`product/${product.slug}`)}
                        className="block w-full"
                      >
                        <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0].image_url}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                          {product.discount_percentage > 0 && (
                            <div className="absolute top-3 right-3 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              -{product.discount_percentage}%
                            </div>
                          )}
                        </div>
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Heart className="w-5 h-5 text-rose-500" />
                      </button>
                    </div>
                    <button
                      onClick={() => onNavigate(`product/${product.slug}`)}
                      className="text-left w-full"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">
                            {product.rating_average.toFixed(1)} ({product.rating_count})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${product.final_price.toFixed(2)}
                        </span>
                        {product.discount_percentage > 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.base_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
