import { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Users, Gift, Sparkles, HeartHandshake, ChevronRight } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

interface CoupleCollectionPageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (product: any) => void;
  onAddToWishlist: (product: any) => void;
}

const coupleProducts = [
  {
    id: 'c1',
    name: 'Matching Couple Bracelets - Forever',
    price: 2999,
    originalPrice: 4499,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
    rating: 4.9,
    reviews: 324,
    tag: 'Bestseller',
    forHim: true,
    forHer: true
  },
  {
    id: 'c2',
    name: 'King & Queen Couple T-Shirts',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400',
    rating: 4.7,
    reviews: 567,
    tag: 'Popular',
    forHim: true,
    forHer: true
  },
  {
    id: 'c3',
    name: 'Couple Photo Keychain Set',
    price: 799,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1631209121750-a9f656d7e8c6?w=400',
    rating: 4.8,
    reviews: 234,
    tag: 'Custom',
    forHim: true,
    forHer: true
  },
  {
    id: 'c4',
    name: 'His & Hers Coffee Mug Set',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    rating: 4.6,
    reviews: 189,
    tag: 'Cute',
    forHim: true,
    forHer: true
  },
  {
    id: 'c5',
    name: 'Couple Watch Set - Classic',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
    rating: 4.9,
    reviews: 156,
    tag: 'Premium',
    forHim: true,
    forHer: true
  },
  {
    id: 'c6',
    name: 'Heart Lock & Key Necklace Set',
    price: 3499,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    rating: 4.8,
    reviews: 278,
    tag: 'Romantic',
    forHim: true,
    forHer: true
  },
  {
    id: 'c7',
    name: 'Couple Hoodie Set - Better Half',
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    rating: 4.7,
    reviews: 345,
    tag: 'Cozy',
    forHim: true,
    forHer: true
  },
  {
    id: 'c8',
    name: 'Personalized Couple Pillowcases',
    price: 1299,
    originalPrice: 1799,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
    rating: 4.6,
    reviews: 123,
    tag: 'Home',
    forHim: true,
    forHer: true
  }
];

const categories = [
  { name: 'Matching Sets', count: 45, icon: '👫' },
  { name: 'Jewelry', count: 32, icon: '💍' },
  { name: 'Clothing', count: 28, icon: '👕' },
  { name: 'Home Decor', count: 24, icon: '🏠' },
  { name: 'Accessories', count: 38, icon: '🎁' },
  { name: 'Custom Gifts', count: 20, icon: '✨' }
];

export default function CoupleCollectionPage({ onNavigate, onAddToCart, onAddToWishlist }: CoupleCollectionPageProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white">
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
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full mb-6 shadow-2xl shadow-rose-500/30">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">Couple Collection</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Perfect matching gifts for couples! From matching accessories to personalized keepsakes - 
              celebrate your love with gifts that come in pairs.
            </p>
            <div className="flex items-center justify-center gap-4 text-rose-600 flex-wrap">
              <span className="flex items-center gap-1"><Heart className="w-5 h-5 fill-rose-500 text-rose-500" /> Made for Two</span>
              <span className="w-1.5 h-1.5 bg-rose-400 rounded-full hidden sm:block"></span>
              <span>His & Hers</span>
              <span className="w-1.5 h-1.5 bg-rose-400 rounded-full hidden sm:block"></span>
              <span>Dual Delivery Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-8 h-8" />
              <span className="font-medium">Perfect Matching</span>
            </div>
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8" />
              <span className="font-medium">Dual Packaging</span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <span className="font-medium">Personalization</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" />
              <span className="font-medium">Two Addresses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => onNavigate('products')}
                className="p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all text-center group hover:-translate-y-1"
              >
                <span className="text-3xl mb-2 block">{cat.icon}</span>
                <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.count} items</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Popular Couple Gifts</h2>
            <button 
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium"
            >
              View All <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coupleProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
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
                    <span className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      {product.tag}
                    </span>
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-rose-600 text-xs font-bold rounded-full">
                      For Both ❤️
                    </span>
                  </div>
                  <button 
                    onClick={() => onAddToWishlist(product)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
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
                      <Star className="w-4 h-4 fill-rose-500 text-rose-500" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-rose-600">₹{product.price.toLocaleString()}</span>
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

      {/* Special Offer */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              💕 Couple Special: Buy 2 Get 20% Off
            </h2>
            <p className="text-rose-100 text-lg mb-6 max-w-2xl mx-auto">
              Perfect pairs deserve perfect savings! Use code <span className="font-bold bg-white/20 px-3 py-1 rounded-lg">COUPLE20</span> at checkout
            </p>
            <button 
              onClick={() => onNavigate('products')}
              className="px-8 py-4 bg-white text-rose-600 font-bold rounded-full hover:bg-rose-50 transition-colors shadow-xl"
            >
              Shop Couple Collection
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
