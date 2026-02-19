import { useEffect, useState } from 'react';
import { Filter, Star, Heart, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { isSupabaseConfigured } from '../lib/supabase';
import { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Demo products for when Supabase is not configured
const demoProducts: Product[] = [
  {
    id: 'demo-1',
    name: 'Heart Pendant Necklace',
    slug: 'heart-pendant-necklace',
    description: 'Beautiful rose gold heart pendant necklace, perfect for expressing your love.',
    category_id: 'cat-1',
    base_price: 89.99,
    discount_percentage: 10,
    final_price: 80.99,
    stock_quantity: 50,
    is_active: true,
    is_featured: true,
    occasion: ['Valentine', 'Anniversary'],
    allows_personalization: false,
    personalization_price: 0,
    rating_average: 4.8,
    rating_count: 124,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-1', product_id: 'demo-1', image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-2',
    name: 'Red Rose Bouquet',
    slug: 'red-rose-bouquet',
    description: 'Stunning bouquet of 24 fresh red roses, symbolizing deep love and passion.',
    category_id: 'cat-2',
    base_price: 59.99,
    discount_percentage: 0,
    final_price: 59.99,
    stock_quantity: 100,
    is_active: true,
    is_featured: true,
    occasion: ['Valentine', 'Anniversary', 'Just Because'],
    allows_personalization: false,
    personalization_price: 0,
    rating_average: 4.9,
    rating_count: 256,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-2', product_id: 'demo-2', image_url: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-3',
    name: 'Luxury Chocolate Box',
    slug: 'luxury-chocolate-box',
    description: 'Premium Belgian chocolates in a beautiful heart-shaped box. 24 assorted pieces.',
    category_id: 'cat-3',
    base_price: 49.99,
    discount_percentage: 15,
    final_price: 42.49,
    stock_quantity: 75,
    is_active: true,
    is_featured: true,
    occasion: ['Valentine', 'Birthday', 'Just Because'],
    allows_personalization: false,
    personalization_price: 0,
    rating_average: 4.7,
    rating_count: 89,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-3', product_id: 'demo-3', image_url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-4',
    name: 'Couple Photo Frame',
    slug: 'couple-photo-frame',
    description: 'Personalized wooden photo frame with custom engraving.',
    category_id: 'cat-4',
    base_price: 39.99,
    discount_percentage: 0,
    final_price: 39.99,
    stock_quantity: 200,
    is_active: true,
    is_featured: false,
    occasion: ['Valentine', 'Anniversary', 'Wedding'],
    allows_personalization: true,
    personalization_price: 10,
    rating_average: 4.6,
    rating_count: 67,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-4', product_id: 'demo-4', image_url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-5',
    name: 'Spa Day for Two',
    slug: 'spa-day-for-two',
    description: 'Relaxing couples spa experience including massage, facial, and aromatherapy session.',
    category_id: 'cat-5',
    base_price: 199.99,
    discount_percentage: 20,
    final_price: 159.99,
    stock_quantity: 30,
    is_active: true,
    is_featured: true,
    occasion: ['Valentine', 'Anniversary'],
    allows_personalization: false,
    personalization_price: 0,
    rating_average: 4.9,
    rating_count: 45,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-5', product_id: 'demo-5', image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-6',
    name: 'Diamond Stud Earrings',
    slug: 'diamond-stud-earrings',
    description: 'Elegant 0.5 carat diamond stud earrings in 14k white gold setting.',
    category_id: 'cat-1',
    base_price: 499.99,
    discount_percentage: 10,
    final_price: 449.99,
    stock_quantity: 25,
    is_active: true,
    is_featured: true,
    occasion: ['Anniversary', 'Wedding'],
    allows_personalization: false,
    personalization_price: 0,
    rating_average: 4.9,
    rating_count: 78,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-6', product_id: 'demo-6', image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-7',
    name: 'Mixed Flower Arrangement',
    slug: 'mixed-flower-arrangement',
    description: 'Beautiful arrangement of roses, lilies, and orchids in an elegant vase.',
    category_id: 'cat-2',
    base_price: 79.99,
    discount_percentage: 0,
    final_price: 79.99,
    stock_quantity: 60,
    is_active: true,
    is_featured: false,
    occasion: ['Anniversary', 'Birthday', 'Just Because'],
    allows_personalization: false,
    personalization_price: 0,
    rating_average: 4.7,
    rating_count: 134,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-7', product_id: 'demo-7', image_url: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-8',
    name: 'Custom Star Map',
    slug: 'custom-star-map',
    description: 'Personalized star map showing the night sky from any special date and location.',
    category_id: 'cat-4',
    base_price: 59.99,
    discount_percentage: 0,
    final_price: 59.99,
    stock_quantity: 150,
    is_active: true,
    is_featured: true,
    occasion: ['Anniversary', 'Wedding', 'Birthday'],
    allows_personalization: true,
    personalization_price: 15,
    rating_average: 4.8,
    rating_count: 189,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-8', product_id: 'demo-8', image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-9',
    name: 'Birthstone Bracelet',
    slug: 'birthstone-bracelet',
    description: 'Delicate sterling silver bracelet featuring your birthstone gem.',
    category_id: 'cat-1',
    base_price: 69.99,
    discount_percentage: 0,
    final_price: 69.99,
    stock_quantity: 80,
    is_active: true,
    is_featured: false,
    occasion: ['Birthday', 'Just Because'],
    allows_personalization: false,
    personalization_price: 0,
    rating_average: 4.6,
    rating_count: 92,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-9', product_id: 'demo-9', image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-10',
    name: 'Gourmet Cookie Box',
    slug: 'gourmet-cookie-box',
    description: 'Assorted gourmet cookies - chocolate chip, red velvet, and macadamia nut.',
    category_id: 'cat-3',
    base_price: 34.99,
    discount_percentage: 0,
    final_price: 34.99,
    stock_quantity: 100,
    is_active: true,
    is_featured: false,
    occasion: ['Birthday', 'Just Because'],
    allows_personalization: false,
    personalization_price: 0,
    rating_average: 4.5,
    rating_count: 78,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-10', product_id: 'demo-10', image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-11',
    name: 'Wedding Band Set',
    slug: 'wedding-band-set',
    description: 'Matching platinum wedding bands with subtle diamond accents.',
    category_id: 'cat-1',
    base_price: 899.99,
    discount_percentage: 5,
    final_price: 854.99,
    stock_quantity: 15,
    is_active: true,
    is_featured: true,
    occasion: ['Wedding'],
    allows_personalization: false,
    personalization_price: 0,
    rating_average: 4.9,
    rating_count: 23,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-11', product_id: 'demo-11', image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
  {
    id: 'demo-12',
    name: 'Mr & Mrs Sign',
    slug: 'mr-mrs-sign',
    description: 'Custom wooden Mr & Mrs sign with your wedding date, perfect for home decor.',
    category_id: 'cat-4',
    base_price: 49.99,
    discount_percentage: 0,
    final_price: 49.99,
    stock_quantity: 100,
    is_active: true,
    is_featured: true,
    occasion: ['Wedding', 'Anniversary'],
    allows_personalization: true,
    personalization_price: 10,
    rating_average: 4.8,
    rating_count: 167,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [{ id: 'img-12', product_id: 'demo-12', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500', display_order: 1, created_at: new Date().toISOString() }],
  },
];

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
  }, [searchParams, sortBy, selectedOccasion, priceRange]);

  const fetchProducts = async () => {
    setLoading(true);
    
    // Use demo products if Supabase is not configured
    if (!isSupabaseConfigured) {
      let filtered = demoProducts.filter(
        (p) => p.final_price >= priceRange[0] && p.final_price <= priceRange[1]
      );
      
      if (selectedOccasion) {
        filtered = filtered.filter((p) => p.occasion.includes(selectedOccasion));
      }
      
      // Apply sorting
      if (sortBy === 'price_asc') {
        filtered.sort((a, b) => a.final_price - b.final_price);
      } else if (sortBy === 'price_desc') {
        filtered.sort((a, b) => b.final_price - a.final_price);
      } else if (sortBy === 'popularity') {
        filtered.sort((a, b) => b.rating_count - a.rating_count);
      } else {
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
      
      setProducts(filtered);
      setLoading(false);
      return;
    }
    
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

    if (data && data.length > 0) {
      const filtered = data.filter(
        (p) => p.final_price >= priceRange[0] && p.final_price <= priceRange[1]
      );
      setProducts(filtered as Product[]);
    } else {
      // Fallback to demo products if database is empty
      let filtered = demoProducts.filter(
        (p) => p.final_price >= priceRange[0] && p.final_price <= priceRange[1]
      );
      
      if (selectedOccasion) {
        filtered = filtered.filter((p) => p.occasion.includes(selectedOccasion));
      }
      
      if (sortBy === 'price_asc') {
        filtered.sort((a, b) => a.final_price - b.final_price);
      } else if (sortBy === 'price_desc') {
        filtered.sort((a, b) => b.final_price - a.final_price);
      } else if (sortBy === 'popularity') {
        filtered.sort((a, b) => b.rating_count - a.rating_count);
      }
      
      setProducts(filtered);
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
