import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Clock, Gem, Award, Zap, ChevronRight, AlertCircle } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

interface LimitedEditionPageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (product: any) => void;
  onAddToWishlist: (product: any) => void;
}

const limitedProducts = [
  {
    id: 'l1',
    name: 'Valentine 2026 Exclusive Box',
    price: 9999,
    originalPrice: 14999,
    image: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=400',
    rating: 5.0,
    reviews: 89,
    tag: 'Valentine Special',
    stock: 12,
    totalStock: 50
  },
  {
    id: 'l2',
    name: 'Diamond Heart Pendant - Rose Gold',
    price: 29999,
    originalPrice: 39999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    rating: 4.9,
    reviews: 45,
    tag: 'Exclusive',
    stock: 5,
    totalStock: 25
  },
  {
    id: 'l3',
    name: 'Artisan Handcrafted Love Box',
    price: 7999,
    originalPrice: 11999,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400',
    rating: 4.8,
    reviews: 67,
    tag: 'Handmade',
    stock: 8,
    totalStock: 30
  },
  {
    id: 'l4',
    name: 'Crystal Forever Rose - Gold Dipped',
    price: 5999,
    originalPrice: 8999,
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
    rating: 4.9,
    reviews: 156,
    tag: 'Limited Stock',
    stock: 15,
    totalStock: 100
  },
  {
    id: 'l5',
    name: 'Luxury Couple Spa Set',
    price: 12999,
    originalPrice: 17999,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    rating: 4.7,
    reviews: 78,
    tag: 'Premium',
    stock: 20,
    totalStock: 75
  },
  {
    id: 'l6',
    name: 'Personalized Star Map - Special Night',
    price: 3999,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400',
    rating: 4.8,
    reviews: 234,
    tag: 'Custom',
    stock: 0,
    totalStock: 50
  },
  {
    id: 'l7',
    name: 'Designer Love Letter Set',
    price: 2999,
    originalPrice: 4499,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400',
    rating: 4.6,
    reviews: 112,
    tag: 'Vintage',
    stock: 25,
    totalStock: 100
  },
  {
    id: 'l8',
    name: 'Memory Book - Leather Bound',
    price: 6999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400',
    rating: 4.9,
    reviews: 189,
    tag: 'Exclusive',
    stock: 3,
    totalStock: 20
  }
];

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Mins' },
        { value: timeLeft.seconds, label: 'Secs' }
      ].map((item, idx) => (
        <div key={idx} className="text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{String(item.value).padStart(2, '0')}</span>
          </div>
          <span className="text-xs text-purple-200 mt-1 block">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function LimitedEditionPage({ onNavigate, onAddToCart, onAddToWishlist }: LimitedEditionPageProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full mb-6">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-medium">Limited Time Offer</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Limited <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Edition</span>
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-10">
              Exclusive gifts available for a limited time only. Once they're gone, they're gone forever. 
              Don't miss your chance to own something truly special.
            </p>
            
            {/* Countdown */}
            <div className="mb-8">
              <p className="text-purple-300 mb-4">Sale Ends In:</p>
              <CountdownTimer />
            </div>
            
            <div className="flex items-center justify-center gap-4 text-purple-300 flex-wrap">
              <span className="flex items-center gap-1"><Gem className="w-5 h-5 text-purple-400" /> Exclusive Items</span>
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full hidden sm:block"></span>
              <span>Limited Stock</span>
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full hidden sm:block"></span>
              <span>Certificate Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <AlertCircle className="w-5 h-5 animate-pulse" />
          <span className="font-medium">⚡ Flash Sale: Extra 10% off on all Limited Edition items! Use code: LIMITED10</span>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Gem, title: 'Rare Finds', desc: 'Unique pieces you won\'t find elsewhere', color: 'purple' },
              { icon: Clock, title: 'Limited Time', desc: 'Available only while stocks last', color: 'indigo' },
              { icon: Award, title: 'Certified', desc: 'Comes with authenticity certificate', color: 'violet' },
              { icon: Zap, title: 'Priority Shipping', desc: 'Express delivery included', color: 'fuchsia' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Exclusive Limited Items</h2>
            <button 
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              View All <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {limitedProducts.map((product) => (
              <div 
                key={product.id}
                className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${product.stock === 0 ? 'opacity-75' : ''}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-full">
                      {product.tag}
                    </span>
                    {product.stock <= 10 && product.stock > 0 && (
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                        Only {product.stock} left!
                      </span>
                    )}
                    {product.stock === 0 && (
                      <span className="px-3 py-1 bg-gray-800 text-white text-xs font-bold rounded-full">
                        Sold Out
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => onAddToWishlist(product)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all shadow-lg"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  
                  {hoveredProduct === product.id && product.stock > 0 && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-purple-500 text-purple-500" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  
                  {/* Stock Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Stock</span>
                      <span>{product.stock}/{product.totalStock}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          product.stock === 0 ? 'bg-gray-400' : 
                          product.stock <= 10 ? 'bg-red-500' : 
                          'bg-gradient-to-r from-purple-500 to-indigo-500'
                        }`}
                        style={{ width: `${(product.stock / product.totalStock) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-purple-600">₹{product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920')] bg-cover bg-center opacity-10"></div>
            <div className="relative">
              <Gem className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our VIP List
              </h2>
              <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
                Be the first to know about new limited edition releases and get exclusive early access before anyone else.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-bold rounded-full hover:from-yellow-300 hover:to-orange-300 transition-colors shadow-xl">
                  Get VIP Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
