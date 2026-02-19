import { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Crown, Sparkles, Gift, Award, ChevronRight } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

interface PremiumCollectionPageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (product: any) => void;
  onAddToWishlist: (product: any) => void;
}

const premiumProducts = [
  {
    id: 'p1',
    name: 'Luxury Diamond Heart Pendant',
    price: 15999,
    originalPrice: 19999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    rating: 4.9,
    reviews: 156,
    tag: 'Bestseller'
  },
  {
    id: 'p2',
    name: 'Premium Couple Watch Set',
    price: 24999,
    originalPrice: 34999,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
    rating: 4.8,
    reviews: 89,
    tag: 'Limited'
  },
  {
    id: 'p3',
    name: 'Silk Rose Bouquet with Box',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
    rating: 4.7,
    reviews: 234,
    tag: 'Premium'
  },
  {
    id: 'p4',
    name: 'Crystal Love Lamp',
    price: 7999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 4.9,
    reviews: 112,
    tag: 'Trending'
  },
  {
    id: 'p5',
    name: 'Personalized Gold Name Bracelet',
    price: 8999,
    originalPrice: 11999,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
    rating: 4.8,
    reviews: 178,
    tag: 'Custom'
  },
  {
    id: 'p6',
    name: 'Luxury Perfume Gift Set',
    price: 12999,
    originalPrice: 17999,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    rating: 4.6,
    reviews: 67,
    tag: 'Premium'
  },
  {
    id: 'p7',
    name: 'Premium Photo Album - Leather',
    price: 5999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400',
    rating: 4.9,
    reviews: 201,
    tag: 'Bestseller'
  },
  {
    id: 'p8',
    name: 'Designer Couple Rings Set',
    price: 18999,
    originalPrice: 24999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    rating: 4.8,
    reviews: 145,
    tag: 'Premium'
  }
];

const features = [
  { icon: Crown, title: 'Premium Quality', desc: 'Handpicked luxury items' },
  { icon: Gift, title: 'Gift Packaging', desc: 'Elegant premium boxes' },
  { icon: Award, title: 'Certified Products', desc: 'Authenticity guaranteed' },
  { icon: Sparkles, title: 'Exclusive Designs', desc: 'Limited edition pieces' }
];

export default function PremiumCollectionPage({ onNavigate, onAddToCart, onAddToWishlist }: PremiumCollectionPageProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white border-b border-amber-500/30">
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-950 to-purple-900"></div>
        {/* Decorative circles like in the image */}
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-amber-500 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border-4 border-amber-400 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 right-10 w-64 h-64 border-4 border-amber-500 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 border-4 border-fuchsia-500 rounded-full opacity-40"></div>
        {/* Gold dots decoration */}
        <div className="absolute bottom-32 left-10 grid grid-cols-8 gap-1">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full opacity-60"></div>
          ))}
        </div>
        <div className="absolute top-10 right-32 grid grid-cols-6 gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-amber-500 rounded-full opacity-50"></div>
          ))}
        </div>
        {/* Curved accent lines */}
        <div className="absolute top-0 right-0 w-96 h-96 border-r-8 border-b-8 border-amber-500/50 rounded-br-full"></div>
        <div className="absolute top-0 right-8 w-96 h-96 border-r-8 border-b-8 border-fuchsia-500/40 rounded-br-full"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-6 shadow-2xl shadow-amber-500/30 ring-4 ring-amber-400/30">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">Premium Collection</span>
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-8">
              Discover our exclusive range of luxury gifts crafted for those who deserve nothing but the best. 
              Each piece is handpicked to make your special moments unforgettable.
            </p>
            <div className="flex items-center justify-center gap-4 text-amber-300">
              <span className="flex items-center gap-1"><Star className="w-5 h-5 fill-amber-400 text-amber-400" /> 4.8+ Rating</span>
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
              <span>500+ Premium Products</span>
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
              <span>Free Gift Packaging</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-purple-900/50 border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-purple-800/50 backdrop-blur border border-amber-500/20 hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl mb-4 ring-2 ring-amber-400/30">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-amber-100 mb-1">{feature.title}</h3>
                <p className="text-sm text-purple-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-amber-100">Featured Premium Gifts</h2>
            <button 
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              View All <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-purple-800/60 backdrop-blur rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 overflow-hidden border border-amber-500/20 hover:border-amber-500/50"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {product.tag}
                    </span>
                  </div>
                  <button 
                    onClick={() => onAddToWishlist(product)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-purple-950/90 to-transparent">
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="font-semibold text-amber-50 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-purple-200">{product.rating}</span>
                    </div>
                    <span className="text-sm text-purple-400">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-amber-400">₹{product.price.toLocaleString()}</span>
                    <span className="text-sm text-purple-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-green-400 bg-green-900/50 px-2 py-0.5 rounded-full">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-5 left-5 w-16 h-16 border-4 border-white/30 rounded-full"></div>
        <div className="absolute bottom-5 right-10 w-24 h-24 border-4 border-white/20 rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Make Every Moment Premium
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Join our exclusive members club and get early access to new arrivals, special discounts, and personalized gift recommendations.
          </p>
          <button 
            onClick={() => onNavigate('products')}
            className="px-8 py-4 bg-purple-900 text-amber-300 font-bold rounded-full hover:bg-purple-800 transition-colors shadow-xl border-2 border-amber-300/50"
          >
            Explore All Premium Gifts
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
