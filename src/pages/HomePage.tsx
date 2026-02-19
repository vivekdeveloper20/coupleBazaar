
import { useEffect, useRef, useState } from 'react';
import { Heart, Package, Truck, Star, ArrowRight, Gift, Sparkles, ShoppingCart, ChevronLeft, ChevronRight, Cake, CalendarHeart, PartyPopper, ThumbsUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';
import { Footer } from '../components/layout/Footer';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeOccasionTab, setActiveOccasionTab] = useState('Birthday');
  const occasionScrollRef = useRef<HTMLDivElement>(null);
  const bondScrollRef = useRef<HTMLDivElement>(null);
  const tailoredScrollRef = useRef<HTMLDivElement>(null);

  const occasionGallery = [
    {
      title: 'Earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      query: 'Earrings',
    },
    {
      title: 'Rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      query: 'Rings',
    },
    {
      title: 'Bracelets',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
      query: 'Bracelets',
    },
    {
      title: 'Anklets',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
      query: 'Anklets',
    },
    {
      title: 'Bangle',
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop',
      query: 'Bangle',
    },
    {
      title: 'Sets',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      query: 'Sets',
    },
    {
      title: "Men's",
      image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop',
      query: "Men's",
    },
    {
      title: 'Mangalsutras',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&h=400&fit=crop',
      query: 'Mangalsutra',
    },
  ];

  const scrollOccasionGallery = (direction: 'left' | 'right') => {
    if (!occasionScrollRef.current) return;
    const distance = 360;
    occasionScrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  const bondGallery = [
    {
      title: 'Wife',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
      query: 'wife',
    },
    {
      title: 'Husband',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      query: 'husband',
    },
    {
      title: 'Mother',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
      query: 'mother',
    },
    {
      title: 'Brothers',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop',
      query: 'brother',
    },
    {
      title: 'Sister',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
      query: 'sister',
    },
    {
      title: 'Friends',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=500&fit=crop',
      query: 'friends',
    },
    {
      title: 'Girlfriend',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
      query: 'girlfriend',
    },
  ];

  const scrollBondGallery = (direction: 'left' | 'right') => {
    if (!bondScrollRef.current) return;
    const distance = 360;
    bondScrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*, images:product_images(*)')
      .eq('is_featured', true)
      .eq('is_active', true)
      .limit(8);

    if (data) {
      setFeaturedProducts(data as Product[]);
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .is('parent_id', null)
      .limit(6);

    if (data) {
      setCategories(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-white"></div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-rose-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-pink-300/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
              <div className="inline-block">
                <span className="px-5 py-2.5 bg-rose-50 rounded-full text-sm font-semibold text-rose-600 border border-rose-200">
                  One Love. Two Addresses. One Order
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Gifts That
                <span className="block bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Bridge Hearts
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Send love to two places at once. Perfect for long-distance couples who want to share moments together.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-xl shadow-rose-500/30 flex items-center space-x-2 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('dual-delivery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-lg border border-gray-200"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Right side - Product showcase grid */}
            <div className="relative animate-[fadeIn_0.8s_ease-out]">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-rose-200 to-pink-200 rounded-[40px] blur-2xl opacity-40"></div>
                
                {/* Main container */}
                <div className="relative bg-white/70 backdrop-blur-xl rounded-[32px] p-6 border border-white/80 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', label: 'Jewelry' },
                      { image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop', label: 'Gift Box' },
                      { image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop', label: 'Flowers' },
                      { image: 'https://images.unsplash.com/photo-1511992243105-2992b3fd0410?w=400&h=400&fit=crop', label: 'Chocolates' },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => onNavigate('products')}
                        className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
                      >
                        <img 
                          src={item.image} 
                          alt={item.label}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.label}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                    ❤️ Couple Gifts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enriching Relationships Banner */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left - Text Section */}
          <div className="lg:w-1/2 bg-[#F5385D] relative py-16 px-8 lg:px-16 flex flex-col justify-center min-h-[280px]">
            {/* Decorative heart blob */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-48 h-48 bg-pink-400/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white leading-tight">
                Enriching Relationships <span className="text-pink-200">❤️</span>
              </h2>
              <div className="w-full h-[1px] bg-white/30 my-4"></div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-white">
                Through Thoughtful <span className="text-yellow-300">🎁</span> Gifts
              </h3>
            </div>
          </div>
          
          {/* Right - Image Section */}
          <div className="lg:w-1/2 relative min-h-[280px] lg:min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&h=500&fit=crop"
              alt="Couple sharing gifts"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="dual-delivery" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100/50 p-8 md:p-12">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white rounded-full mb-6 shadow-sm">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  <span className="text-sm font-semibold text-rose-600">Special Feature</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Dual Delivery Made Simple
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  One checkout, two addresses, zero hassle. Send matching love gifts to both sides in a single smooth order.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: ShoppingCart,
                    title: '1. Shop Together',
                    description: 'Pick gifts from one cart and personalize each item for your special day.',
                  },
                  {
                    icon: Truck,
                    title: '2. Split Delivery',
                    description: 'Choose separate delivery addresses for each gift during checkout.',
                  },
                  {
                    icon: Package,
                    title: '3. Track Independently',
                    description: 'Get individual shipment updates so both deliveries stay on schedule.',
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-rose-500/20">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-5 border border-gray-100 shadow-sm">
                <p className="text-gray-700 font-medium text-center md:text-left">
                  Perfect for long-distance couples, surprise dates, anniversaries, and gift syncing.
                </p>
                <button
                  onClick={() => onNavigate('products')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30 whitespace-nowrap"
                >
                  Start Dual Order
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Celebrate Her Every Mood - Cherished Celebrations Section */}
      <section className="py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6 items-stretch">
            {/* Left - Hero Banner */}
            <div className="lg:col-span-2 relative min-h-[500px] rounded-[32px] overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 p-8 flex flex-col justify-between">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-rose-300/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-20 left-4 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl"></div>
              
              {/* Gift box visual */}
              <div className="relative flex-1 flex items-center justify-center">
                <div className="relative">
                  {/* Gift box */}
                  <div className="w-48 h-48 bg-white rounded-2xl shadow-xl relative">
                    {/* Ribbon */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-8 bg-rose-400 rounded-t-full"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-rose-400"></div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-rose-400"></div>
                    {/* Bow */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                      <div className="flex items-center">
                        <div className="w-8 h-6 bg-rose-500 rounded-full -rotate-45"></div>
                        <div className="w-8 h-6 bg-rose-500 rounded-full rotate-45 -ml-2"></div>
                      </div>
                    </div>
                  </div>
                  {/* Floating items around gift */}
                  <div className="absolute -top-8 -left-8 text-3xl animate-bounce">🌸</div>
                  <div className="absolute -top-4 -right-6 text-2xl animate-bounce delay-100">💐</div>
                  <div className="absolute -bottom-4 -left-6 text-2xl animate-bounce delay-200">🎀</div>
                  <div className="absolute -bottom-2 -right-8 text-3xl animate-bounce delay-300">✨</div>
                </div>
              </div>

              {/* Text content */}
              <div className="relative bg-gradient-to-r from-rose-500 to-pink-500 -mx-8 -mb-8 p-6 rounded-b-[32px]">
                <p className="text-rose-100 text-sm font-medium mb-1">Gifts for Cheers, Congrats &</p>
                <h2 className="text-3xl font-bold text-white font-serif italic">Celebrate Her Every Mood 💕</h2>
                <p className="text-rose-100 text-sm mt-2">From Birthdays to Tough Days – Be There Always.</p>
                <button
                  onClick={() => onNavigate('products?for=her')}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-rose-600 rounded-full font-semibold hover:bg-rose-50 transition-colors shadow-lg"
                >
                  Explore Special Moments
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right - Category Cards Grid */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { title: 'Birthday Surprise', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop', emoji: '🎂' },
                { title: 'Anniversary Love', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=300&fit=crop', emoji: '💑' },
                { title: 'Date Night Special', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop', emoji: '🌙' },
                { title: 'Romantic Gifts', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop', emoji: '💝' },
                { title: 'Period Care Box', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop', emoji: '🩹' },
                { title: 'Mood Booster Box', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop', emoji: '🌈' },
                { title: 'Apology Gifts', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', emoji: '🙏' },
                { title: 'Self-Care Kit', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=300&fit=crop', emoji: '💆' },
                { title: 'Achievement Day', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop', emoji: '🏆' },
                { title: 'Long Distance', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=300&fit=crop', emoji: '💌' },
              ].map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(`products?category=${encodeURIComponent(category.title)}`)}
                  className="group text-center"
                >
                  <div className="relative bg-gradient-to-b from-rose-100 to-pink-100 rounded-[24px] p-3 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    {/* Person image container */}
                    <div className="relative">
                      <div className="aspect-square rounded-[20px] overflow-hidden bg-rose-50">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {/* Floating gift box decoration */}
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-lg">
                        {category.emoji}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                    {category.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Recipient Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900">Shop by Recipient</h2>
            <p className="text-gray-600 mt-2">Find the perfect gift for your special someone</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* His Card */}
            <button
              onClick={() => onNavigate('products?search=for+him')}
              className="group relative text-left rounded-3xl overflow-hidden min-h-[320px] shadow-xl hover:shadow-2xl transition-shadow"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                  alt="Gifts for Him"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-rose-700/70 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-between min-h-[320px]">
                <div className="max-w-[220px]">
                  <span className="inline-flex px-5 py-1.5 rounded-full bg-amber-100 text-rose-700 font-bold text-lg">
                    His
                  </span>
                  <p className="mt-4 text-4xl font-bold text-white leading-tight drop-shadow-lg">Endless Love</p>
                  <p className="mt-2 text-white/80 text-sm">Watches, Wallets, Grooming & More</p>
                </div>

                <span className="inline-flex items-center gap-3 text-white font-semibold text-xl group-hover:gap-4 transition-all">
                  Shop Now
                  <span className="w-10 h-10 rounded-full bg-white text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition-colors shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </span>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/10 rounded-full"></div>
            </button>

            {/* Her Card */}
            <button
              onClick={() => onNavigate('products?search=for+her')}
              className="group relative text-left rounded-3xl overflow-hidden min-h-[320px] shadow-xl hover:shadow-2xl transition-shadow"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&fit=crop"
                  alt="Gifts for Her"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-800/90 via-pink-600/70 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-between min-h-[320px]">
                <div className="max-w-[220px]">
                  <span className="inline-flex px-5 py-1.5 rounded-full bg-amber-100 text-rose-700 font-bold text-lg">
                    Her
                  </span>
                  <p className="mt-4 text-4xl font-bold text-white leading-tight drop-shadow-lg">After The Roses</p>
                  <p className="mt-2 text-white/80 text-sm">Jewelry, Spa Kits, Flowers & More</p>
                </div>

                <span className="inline-flex items-center gap-3 text-white font-semibold text-xl group-hover:gap-4 transition-all">
                  Shop Now
                  <span className="w-10 h-10 rounded-full bg-white text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition-colors shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </span>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/10 rounded-full"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Pick Their Fav Flowers Section */}
      <section className="py-16 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Pick Their Fav Flowers</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { name: 'Roses', image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=500&fit=crop' },
              { name: 'Carnations', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=500&fit=crop' },
              { name: 'Orchids', image: 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=400&h=500&fit=crop' },
              { name: 'Sunflowers', image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=500&fit=crop' },
              { name: 'Gerberas', image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=500&fit=crop' },
              { name: 'Luxe', image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=500&fit=crop' },
            ].map((flower, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(`products?category=${encodeURIComponent(flower.name)}`)}
                className="group text-center"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 shadow-md hover:shadow-xl transition-shadow">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Soft gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <p className="mt-4 text-base font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                  {flower.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tailored For Your Occasions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Tailored For Your Occasions</h2>
          
          {/* Occasion Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
            {[
              { name: 'Birthday', icon: Cake },
              { name: 'Anniversary', icon: CalendarHeart },
              { name: 'Love N Romance', icon: Heart },
              { name: 'Wedding', icon: Sparkles },
              { name: 'Congratulations', icon: PartyPopper },
              { name: 'Thank You', icon: ThumbsUp },
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveOccasionTab(tab.name)}
                className={`flex flex-col items-center px-6 py-3 rounded-lg transition-all ${
                  activeOccasionTab === tab.name
                    ? 'bg-amber-50 border-2 border-amber-400 text-amber-700'
                    : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className={`w-5 h-5 mb-1 ${activeOccasionTab === tab.name ? 'text-amber-600' : 'text-gray-500'}`} />
                <span className="text-sm font-medium whitespace-nowrap">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Products Carousel */}
          <div className="relative">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => {
                if (tailoredScrollRef.current) {
                  tailoredScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
                }
              }}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={tailoredScrollRef}
              className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex gap-5 min-w-max pb-4">
                {(activeOccasionTab === 'Birthday' ? [
                  {
                    name: 'Angelic Rose Bouquet N Black Forest...',
                    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop',
                    originalPrice: 1349,
                    price: 849,
                    rating: 5,
                    reviews: 361,
                    tag: null,
                  },
                  {
                    name: 'Golden Glow Sansevieria Birthday Planter',
                    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
                    originalPrice: 1499,
                    price: 899,
                    rating: 4,
                    reviews: 128,
                    tag: 'PRICE DROP',
                  },
                  {
                    name: 'Butterscotch Crunch Cake Half Kg',
                    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
                    originalPrice: 839,
                    price: 599,
                    rating: 5,
                    reviews: 542,
                    tag: null,
                  },
                  {
                    name: 'Birthday Special Syngonium Plant',
                    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
                    originalPrice: 829,
                    price: 529,
                    rating: 4,
                    reviews: 89,
                    tag: 'Best Seller',
                  },
                  {
                    name: 'Premium Chocolate Gift Box',
                    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop',
                    originalPrice: 1299,
                    price: 999,
                    rating: 5,
                    reviews: 234,
                    tag: null,
                  },
                ] : activeOccasionTab === 'Anniversary' ? [
                  {
                    name: 'Elegant Rose & Wine Hamper',
                    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop',
                    originalPrice: 2499,
                    price: 1899,
                    rating: 5,
                    reviews: 245,
                    tag: 'Best Seller',
                  },
                  {
                    name: 'Crystal Heart Photo Frame',
                    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop',
                    originalPrice: 1299,
                    price: 999,
                    rating: 4,
                    reviews: 178,
                    tag: null,
                  },
                  {
                    name: 'Anniversary Special Truffle Cake 1Kg',
                    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=400&fit=crop',
                    originalPrice: 1199,
                    price: 899,
                    rating: 5,
                    reviews: 432,
                    tag: 'PRICE DROP',
                  },
                  {
                    name: 'Couple Name Engraved Pendant Set',
                    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
                    originalPrice: 1999,
                    price: 1499,
                    rating: 5,
                    reviews: 89,
                    tag: null,
                  },
                  {
                    name: '100 Roses Love Bouquet',
                    image: 'https://images.unsplash.com/photo-1494336956603-39d74c3afe8d?w=400&h=400&fit=crop',
                    originalPrice: 3499,
                    price: 2799,
                    rating: 5,
                    reviews: 567,
                    tag: 'Premium',
                  },
                ] : activeOccasionTab === 'Love N Romance' ? [
                  {
                    name: 'Heart Shaped Red Roses Arrangement',
                    image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop',
                    originalPrice: 1899,
                    price: 1499,
                    rating: 5,
                    reviews: 892,
                    tag: 'Best Seller',
                  },
                  {
                    name: 'Romantic Candle Light Dinner Set',
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                    originalPrice: 2999,
                    price: 2299,
                    rating: 4,
                    reviews: 156,
                    tag: null,
                  },
                  {
                    name: 'Love You Forever Teddy Bear',
                    image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=400&h=400&fit=crop',
                    originalPrice: 999,
                    price: 699,
                    rating: 5,
                    reviews: 1234,
                    tag: 'PRICE DROP',
                  },
                  {
                    name: 'Couple Spa Gift Hamper',
                    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=400&fit=crop',
                    originalPrice: 2499,
                    price: 1899,
                    rating: 4,
                    reviews: 78,
                    tag: null,
                  },
                  {
                    name: 'Heart Red Velvet Cake 1Kg',
                    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400&h=400&fit=crop',
                    originalPrice: 1299,
                    price: 999,
                    rating: 5,
                    reviews: 654,
                    tag: null,
                  },
                ] : activeOccasionTab === 'Wedding' ? [
                  {
                    name: 'Royal Wedding Flower Arrangement',
                    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
                    originalPrice: 4999,
                    price: 3999,
                    rating: 5,
                    reviews: 234,
                    tag: 'Premium',
                  },
                  {
                    name: 'Wedding Gift Hamper Deluxe',
                    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
                    originalPrice: 3499,
                    price: 2799,
                    rating: 5,
                    reviews: 189,
                    tag: 'Best Seller',
                  },
                  {
                    name: 'Couple Portrait Caricature Frame',
                    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop',
                    originalPrice: 1999,
                    price: 1499,
                    rating: 4,
                    reviews: 87,
                    tag: null,
                  },
                  {
                    name: '3 Tier Wedding Fondant Cake',
                    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop',
                    originalPrice: 5999,
                    price: 4999,
                    rating: 5,
                    reviews: 156,
                    tag: null,
                  },
                  {
                    name: 'Wedding Blessing Money Plant',
                    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
                    originalPrice: 1299,
                    price: 899,
                    rating: 4,
                    reviews: 234,
                    tag: 'PRICE DROP',
                  },
                ] : activeOccasionTab === 'Congratulations' ? [
                  {
                    name: 'Congratulations Balloon Bouquet',
                    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop',
                    originalPrice: 1499,
                    price: 1199,
                    rating: 5,
                    reviews: 345,
                    tag: 'Best Seller',
                  },
                  {
                    name: 'Success Celebration Cake 1Kg',
                    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400&h=400&fit=crop',
                    originalPrice: 1099,
                    price: 849,
                    rating: 5,
                    reviews: 567,
                    tag: 'PRICE DROP',
                  },
                  {
                    name: 'Achievement Trophy with Flowers',
                    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=400&fit=crop',
                    originalPrice: 1899,
                    price: 1499,
                    rating: 4,
                    reviews: 123,
                    tag: null,
                  },
                  {
                    name: 'Gourmet Chocolate Hamper',
                    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop',
                    originalPrice: 1699,
                    price: 1299,
                    rating: 5,
                    reviews: 289,
                    tag: null,
                  },
                  {
                    name: 'Mixed Flowers & Sweets Combo',
                    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop',
                    originalPrice: 1399,
                    price: 999,
                    rating: 4,
                    reviews: 178,
                    tag: null,
                  },
                ] : [
                  {
                    name: 'Thank You Flower Basket',
                    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
                    originalPrice: 1299,
                    price: 999,
                    rating: 5,
                    reviews: 456,
                    tag: 'Best Seller',
                  },
                  {
                    name: 'Gratitude Gift Box Premium',
                    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop',
                    originalPrice: 1899,
                    price: 1499,
                    rating: 4,
                    reviews: 234,
                    tag: null,
                  },
                  {
                    name: 'Thank You Card with Chocolates',
                    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop',
                    originalPrice: 799,
                    price: 599,
                    rating: 5,
                    reviews: 789,
                    tag: 'PRICE DROP',
                  },
                  {
                    name: 'Appreciation Plant Gift',
                    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
                    originalPrice: 899,
                    price: 649,
                    rating: 4,
                    reviews: 167,
                    tag: null,
                  },
                  {
                    name: 'Custom Thank You Photo Cake',
                    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
                    originalPrice: 1199,
                    price: 899,
                    rating: 5,
                    reviews: 345,
                    tag: null,
                  },
                ]).map((product, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate('products')}
                    className="group w-[280px] text-left"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Image dots indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-gray-800"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                      </div>
                    </div>
                    <h3 className="text-gray-800 font-medium mb-1 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
                      <span className="text-gray-900 font-bold">₹{product.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-green-600 fill-green-600" />
                          <span className="text-sm text-gray-600">{product.rating} | {product.reviews}</span>
                        </div>
                      )}
                    </div>
                    {product.tag && (
                      <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded ${
                        product.tag === 'PRICE DROP' ? 'bg-orange-500 text-white' : 'bg-teal-500 text-white'
                      }`}>
                        {product.tag}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Next"
              onClick={() => {
                if (tailoredScrollRef.current) {
                  tailoredScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
                }
              }}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Birthday Gifts That Wow Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Birthday Gifts That Wow</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Flowers', image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500&h=600&fit=crop' },
              { name: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=600&fit=crop' },
              { name: 'Personalised', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=500&h=600&fit=crop' },
              { name: 'Balloon & Guitarist Services', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=600&fit=crop' },
            ].map((category, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(`products?category=${encodeURIComponent(category.name)}`)}
                className="group text-center"
              >
                <div className="relative aspect-[5/6] rounded-2xl overflow-hidden bg-stone-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="mt-4 text-base font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Handmade Special Gifts Section */}
      <section className="py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full text-sm font-medium mb-4">
              ✋ Crafted with Love
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Handmade Special Gifts</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Unique artisan creations made with care and passion - because handmade means heartmade</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { name: 'Handmade Cards', image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=500&fit=crop', emoji: '💌' },
              { name: 'Crochet Gifts', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=400&h=500&fit=crop', emoji: '🧶' },
              { name: 'Handmade Candles', image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=500&fit=crop', emoji: '🕯️' },
              { name: 'Hand Painted', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop', emoji: '🎨' },
              { name: 'Pottery & Clay', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=500&fit=crop', emoji: '🏺' },
              { name: 'Macrame Art', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=500&fit=crop', emoji: '🪢' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(`products?category=${encodeURIComponent(item.name)}`)}
                className="group text-center"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 border border-rose-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Handmade badge */}
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xl shadow-md">
                    {item.emoji}
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                  {item.name}
                </p>
              </button>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Every gift tells a story ✨</h3>
              <p className="text-rose-100 mt-2">Support local artisans with handcrafted treasures</p>
            </div>
            <button
              onClick={() => onNavigate('products?category=handmade')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rose-600 rounded-full font-bold hover:bg-rose-50 transition-colors shadow-lg whitespace-nowrap"
            >
              Explore All Handmade
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Celebrate Love Section */}
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Celebrate Love Banner */}
            <div className="relative h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&h=600&fit=crop"
                  alt="Flower Bouquet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 to-pink-500 p-6 rounded-b-3xl">
                <h2 className="text-4xl font-serif italic text-white mb-2">Celebrate Love</h2>
                <p className="text-white/90 text-lg">Perfect gifts for every story</p>
              </div>
              {/* Floating hearts */}
              <div className="absolute top-6 right-10">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-bounce" />
              </div>
              <div className="absolute top-12 right-4">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-bounce delay-100" />
              </div>
            </div>

            {/* Right - Heart Shaped Occasion Cards */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { title: 'Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop', query: 'Wedding' },
                { title: 'Anniversary', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=300&fit=crop', query: 'Anniversary' },
                { title: 'Thinking Of You', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&h=300&fit=crop', query: 'Thinking Of You' },
                { title: 'I Am Sorry', image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=300&h=300&fit=crop', query: 'Sorry' },
                { title: 'Romantic Flowers', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop', query: 'Flowers' },
                { title: 'For Girlfriend', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop', query: 'Girlfriend' },
                { title: 'For Boyfriend', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', query: 'Boyfriend' },
                { title: 'Miss You', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=300&fit=crop', query: 'Miss You' },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => onNavigate(`products?occasion=${encodeURIComponent(item.query)}`)}
                  className="group text-center"
                >
                  {/* Heart Shape using CSS */}
                  <div className="relative w-full aspect-square flex items-center justify-center">
                    <div 
                      className="relative w-[85%] h-[85%] bg-gradient-to-b from-pink-200 to-rose-200 group-hover:from-pink-300 group-hover:to-rose-300 transition-colors"
                      style={{
                        borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                        transform: 'rotate(-45deg)',
                      }}
                    >
                      <div 
                        className="absolute -top-[25%] left-[25%] w-[50%] h-[50%] bg-gradient-to-b from-pink-200 to-rose-200 group-hover:from-pink-300 group-hover:to-rose-300 rounded-full transition-colors"
                      />
                      <div 
                        className="absolute top-[25%] -left-[25%] w-[50%] h-[50%] bg-gradient-to-b from-pink-200 to-rose-200 group-hover:from-pink-300 group-hover:to-rose-300 rounded-full transition-colors"
                      />
                      {/* Image inside heart */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center overflow-hidden"
                        style={{ transform: 'rotate(45deg)' }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-[70%] h-[70%] object-cover rounded-full border-4 border-white/50"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-700 group-hover:text-rose-600 transition-colors leading-tight">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-rose-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Occasion</h2>
              <p className="text-xl text-gray-600">Find the perfect gift for every special moment</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onNavigate(`products?category=${category.slug}`)}
                  className="group relative aspect-square rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-400 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  {category.image_url && (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">
                      {category.name}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Shop by Jewelry</h2>
            <p className="text-gray-600 mt-2">Explore our beautiful collection</p>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollOccasionGallery('left')}
              className="hidden lg:flex absolute left-0 top-[42%] -translate-y-1/2 -translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              ref={occasionScrollRef}
              className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex gap-6 min-w-max">
                {occasionGallery.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => onNavigate(`products?occasion=${encodeURIComponent(item.query)}`)}
                    className="group text-center"
                  >
                    <div className="w-[180px] h-[180px] rounded-[30px] overflow-hidden border border-rose-200 bg-rose-50 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="mt-4 text-2xl text-gray-900">{item.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollOccasionGallery('right')}
              className="hidden lg:flex absolute right-0 top-[42%] -translate-y-1/2 translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">Shop by Bond</h2>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Previous bonds"
              onClick={() => scrollBondGallery('left')}
              className="hidden lg:flex absolute left-0 top-[38%] -translate-y-1/2 -translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              ref={bondScrollRef}
              className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex gap-4 min-w-max pb-2">
                {bondGallery.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => onNavigate(`products?search=${encodeURIComponent(item.query)}`)}
                    className="w-[250px] rounded-3xl border border-gray-300 bg-gray-200 p-3 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="h-[310px] rounded-2xl overflow-hidden bg-amber-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-2xl text-gray-900 mt-3 leading-none">{item.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Next bonds"
              onClick={() => scrollBondGallery('right')}
              className="hidden lg:flex absolute right-0 top-[38%] -translate-y-1/2 translate-x-5 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                <p className="text-xl text-gray-600">Handpicked gifts for your special someone</p>
              </div>
              <button
                onClick={() => onNavigate('products')}
                className="hidden md:flex items-center space-x-2 text-rose-500 font-medium hover:text-rose-600 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onNavigate(`product/${product.slug}`)}
                  className="group text-left"
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
              ))}
            </div>
          </div>
        </section>
      )}

      {/* First Access Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 py-12 md:py-16">
        {/* Decorative floating elements */}
        <div className="absolute top-4 left-10 w-8 h-8 bg-pink-300/50 rounded-full blur-sm"></div>
        <div className="absolute bottom-8 left-1/4 w-6 h-6 bg-rose-300/40 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-pink-400/30 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left - Girl Image */}
            <div className="lg:w-1/4 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop"
                alt="Happy customer"
                className="w-48 h-60 lg:w-full lg:h-auto object-cover rounded-2xl shadow-xl"
              />
            </div>
            
            {/* Center - Text */}
            <div className="lg:flex-1 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-rose-600">FIRST</span> <span className="text-gray-800">ACCESS</span>
              </h2>
              <p className="text-2xl md:text-3xl font-serif italic text-rose-500 mt-2">to what's new!</p>
              <p className="text-gray-600 mt-4 text-lg">New design destined to become bestsellers</p>
              <button
                onClick={() => onNavigate('products?sort=newest')}
                className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 transition-colors shadow-lg"
              >
                Shop New Arrivals
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Right - Jewelry Images */}
            <div className="lg:w-1/3 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop"
                alt="New jewelry collection"
                className="w-full h-56 lg:h-64 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Bestsellers <span className="text-gray-500 text-xl font-normal">(155 Designs)</span></h2>
            <button
              onClick={() => onNavigate('products?sort=bestselling')}
              className="hidden md:flex items-center gap-2 text-rose-500 font-medium hover:text-rose-600"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                name: 'Golden Star Constellation Necklace',
                image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
                price: 3499,
                originalPrice: 5499,
                rating: 4.8,
                reviews: 905,
              },
              { 
                name: 'Silver Deer Heart Necklace',
                image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=500&fit=crop',
                price: 3899,
                originalPrice: 6199,
                rating: 4.8,
                reviews: 676,
              },
              { 
                name: 'Silver Zircon Pendant Chain',
                image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=500&fit=crop',
                price: 3299,
                originalPrice: 5799,
                rating: 4.8,
                reviews: 461,
              },
              { 
                name: 'Silver Zircon Drop Earrings',
                image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop',
                price: 3499,
                originalPrice: 5499,
                rating: 4.8,
                reviews: 536,
              },
            ].map((product, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(`products?category=jewelry`)}
                className="group text-left"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-50 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Bestseller Tag */}
                  <div className="absolute top-3 left-3 bg-rose-500 text-white px-3 py-1 rounded-sm text-xs font-semibold">
                    Bestseller
                  </div>
                  {/* Wishlist Heart */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 transition-colors">
                    <Heart className="w-4 h-4 text-rose-400" />
                  </button>
                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-sm">
                    <span className="font-semibold">{product.rating}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-gray-500">| {product.reviews}</span>
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                </div>
                
                {/* Name */}
                <h3 className="text-sm text-gray-700 line-clamp-1 group-hover:text-rose-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Coupon */}
                <p className="text-xs text-teal-600 font-medium mt-1">EXTRA 15% OFF with coupon</p>
                
                {/* Add to Cart Button */}
                <button className="mt-3 w-full py-2.5 bg-pink-100 text-rose-600 rounded-lg font-semibold hover:bg-pink-200 transition-colors">
                  Add to Cart
                </button>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Stories Section */}
      <section className="py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Customer Stories</h2>
            <p className="text-gray-600 mt-3">Real love, real gifts, real smiles</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                location: 'Mumbai',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                rating: 5,
                review: 'The dual delivery feature is amazing! Sent gifts to my husband in Bangalore and parents in Delhi at the same time. Both arrived perfectly on our anniversary!',
                product: 'Anniversary Gift Hamper',
                productImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=100&h=100&fit=crop',
              },
              {
                name: 'Rahul Verma',
                location: 'Delhi',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                rating: 5,
                review: 'Surprised my girlfriend with a beautiful rose bouquet and chocolates. The quality was outstanding and delivery was right on time. She loved it!',
                product: 'Rose Bouquet & Chocolates',
                productImage: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=100&h=100&fit=crop',
              },
              {
                name: 'Ananya Patel',
                location: 'Bangalore',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
                rating: 5,
                review: 'Best platform for couple gifts! The handmade jewelry set I ordered for my sister wedding was exquisite. Everyone asked where I got it from!',
                product: 'Handmade Jewelry Set',
                productImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop',
              },
            ].map((story, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Header with customer info */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-rose-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-gray-500">{story.location}</p>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                {/* Review */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{story.review}"</p>
                
                {/* Product purchased */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={story.productImage}
                    alt={story.product}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-xs text-gray-500">Purchased</p>
                    <p className="text-sm font-medium text-gray-800">{story.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl font-bold text-rose-600">50K+</p>
              <p className="text-sm text-gray-600">Happy Couples</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-rose-600">4.9</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-rose-600">200+</p>
              <p className="text-sm text-gray-600">Cities Delivered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-rose-600">100%</p>
              <p className="text-sm text-gray-600">Love Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section className="py-20 bg-gradient-to-b from-white via-rose-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-4">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-rose-700">Fresh Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Love, Life & <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Gifting</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover tips, inspiration, and heartfelt stories to make every moment special
            </p>
          </div>

          {/* Blog Grid - Unique Bento Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Featured Large Post */}
            <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gray-900 h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop"
                alt="Featured Blog"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full">
                    FEATURED
                  </span>
                  <span className="text-white/70 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                      <path strokeWidth="2" d="M12 6v6l4 2"/>
                    </svg>
                    8 min read
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-rose-200 transition-colors">
                  The Ultimate Guide to Choosing Anniversary Gifts That Speak From Heart
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-5 line-clamp-2">
                  Discover the art of selecting meaningful anniversary gifts that celebrate your unique love story and create lasting memories together.
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="Author"
                    className="w-10 h-10 rounded-full ring-2 ring-white/30"
                  />
                  <div>
                    <p className="text-white font-medium text-sm">Priya Sharma</p>
                    <p className="text-white/60 text-xs">Feb 15, 2026</p>
                  </div>
                </div>
              </div>
              
              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Right Column - Stacked Posts */}
            <div className="flex flex-col gap-6">
              {/* Post 2 */}
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-400 to-pink-500 p-6 h-[238px] cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-3">
                  RELATIONSHIP
                </span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                  5 Love Languages: Finding Your Partner's Gift Style
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-4">
                  Understanding how your partner receives love can transform your gift-giving game forever.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-xs">5 min read</span>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Post 3 */}
              <div className="group relative overflow-hidden rounded-3xl h-[238px] cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop"
                  alt="Blog"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full mb-2">
                    DIY IDEAS
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-200 transition-colors">
                    Handmade Gift Ideas That Will Melt Their Heart
                  </h3>
                  <span className="text-white/70 text-xs mt-2 block">4 min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - 3 Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {
                image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&h=300&fit=crop',
                category: 'CELEBRATION',
                categoryColor: 'bg-purple-500',
                title: 'Birthday Surprises: Beyond the Cake',
                readTime: '6 min',
                date: 'Feb 12, 2026',
              },
              {
                image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop',
                category: 'COUPLES',
                categoryColor: 'bg-rose-500',
                title: 'Long Distance Love: Gifts That Bridge Miles',
                readTime: '7 min',
                date: 'Feb 10, 2026',
              },
              {
                image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400&h=300&fit=crop',
                category: 'TRENDS',
                categoryColor: 'bg-teal-500',
                title: '2026 Gift Trends Every Couple Should Know',
                readTime: '5 min',
                date: 'Feb 8, 2026',
              },
            ].map((post, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 ${post.categoryColor} text-white text-xs font-semibold rounded-full`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                        <path strokeWidth="1.5" d="M12 6v6l4 2"/>
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
              <span>Explore All Articles</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10">
          <svg viewBox="0 0 1440 100" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
            <path fill="white" d="M0,0 L1440,0 L1440,60 Q720,100 0,60 Z" />
          </svg>
        </div>
        
        <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-400 pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Heart Icon */}
            <div className="mb-8">
              <Heart className="w-20 h-20 text-white mx-auto fill-white drop-shadow-lg" />
            </div>
            
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Never Miss a Special Moment
            </h2>
            
            {/* Subtext */}
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl mx-auto">
              Subscribe to get exclusive deals, gift ideas, and anniversary reminders
            </p>
            
            {/* Email Form */}
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-700 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg text-center sm:text-left"
              />
              <button
                type="submit"
                className="px-10 py-4 bg-white text-rose-500 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
            
            {/* Privacy note */}
            <p className="text-white/70 text-sm mt-6">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer (shared) */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
