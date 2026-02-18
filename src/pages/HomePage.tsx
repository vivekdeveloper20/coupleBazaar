import { useEffect, useRef, useState } from 'react';
import { Heart, Package, Truck, Star, ArrowRight, Gift, Sparkles, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const occasionScrollRef = useRef<HTMLDivElement>(null);
  const bondScrollRef = useRef<HTMLDivElement>(null);

  const occasionGallery = [
    {
      title: 'Earrings',
      image: 'https://source.unsplash.com/600x600/?diamond,earrings',
      query: 'Earrings',
    },
    {
      title: 'Rings',
      image: 'https://source.unsplash.com/600x600/?jewellery,rings',
      query: 'Rings',
    },
    {
      title: 'Bracelets',
      image: 'https://source.unsplash.com/600x600/?bracelet,jewelry',
      query: 'Bracelets',
    },
    {
      title: 'Anklets',
      image: 'https://source.unsplash.com/600x600/?anklet,jewellery',
      query: 'Anklets',
    },
    {
      title: 'Bangle',
      image: 'https://source.unsplash.com/600x600/?bangle,jewellery',
      query: 'Bangle',
    },
    {
      title: 'Sets',
      image: 'https://source.unsplash.com/600x600/?jewelry,set',
      query: 'Sets',
    },
    {
      title: "Men's",
      image: 'https://source.unsplash.com/600x600/?mens,jewelry',
      query: "Men's",
    },
    {
      title: 'Mangalsutras',
      image: 'https://source.unsplash.com/600x600/?mangalsutra,necklace',
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
      image: 'https://source.unsplash.com/600x700/?woman,portrait',
      query: 'wife',
    },
    {
      title: 'Husband',
      image: 'https://source.unsplash.com/600x700/?man,portrait',
      query: 'husband',
    },
    {
      title: 'Mother',
      image: 'https://source.unsplash.com/600x700/?mother,portrait',
      query: 'mother',
    },
    {
      title: 'Brothers',
      image: 'https://source.unsplash.com/600x700/?brothers,portrait',
      query: 'brother',
    },
    {
      title: 'Sister',
      image: 'https://source.unsplash.com/600x700/?sister,portrait',
      query: 'sister',
    },
    {
      title: 'Friends',
      image: 'https://source.unsplash.com/600x700/?friends,portrait',
      query: 'friends',
    },
    {
      title: 'Girlfriend',
      image: 'https://source.unsplash.com/600x700/?girlfriend,portrait',
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-[fadeIn_0.6s_ease-out]">
              <div className="inline-block">
                <span className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-rose-600 border border-rose-200">
                  One Love. Two Addresses. One Order
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Gifts That
                <span className="block bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Bridge Hearts
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Send love to two places at once. Perfect for long-distance couples who want to share moments together.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30 flex items-center space-x-2 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('dual-delivery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all shadow-lg border border-gray-200"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative animate-[fadeIn_0.8s_ease-out]">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        <Gift className="w-12 h-12 text-rose-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dual-delivery" className="py-20 bg-gradient-to-b from-white via-rose-50/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-xl shadow-rose-100/40">
            <div className="absolute -top-16 -left-16 w-56 h-56 bg-rose-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />

            <div className="relative p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-50 rounded-full mb-4 border border-rose-100">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  <span className="text-sm font-medium text-rose-600">Special Feature</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Dual Delivery Made Simple
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  One checkout, two addresses, zero hassle. Send matching love gifts to both sides in a single smooth order.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  {
                    icon: ShoppingCart,
                    title: '1. Shop Together',
                    description: 'Pick gifts from one cart and personalize each item for your special day.',
                    color: 'from-rose-500 to-pink-500',
                  },
                  {
                    icon: Truck,
                    title: '2. Split Delivery',
                    description: 'Choose separate delivery addresses for each gift during checkout.',
                    color: 'from-fuchsia-500 to-rose-500',
                  },
                  {
                    icon: Package,
                    title: '3. Track Independently',
                    description: 'Get individual shipment updates so both deliveries stay on schedule.',
                    color: 'from-pink-500 to-rose-500',
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group p-7 bg-gradient-to-b from-white to-rose-50 rounded-2xl border border-rose-100 hover:shadow-lg hover:shadow-rose-100/40 transition-all"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-rose-100 bg-rose-50/70 px-6 py-5">
                <p className="text-gray-700 font-medium text-center md:text-left">
                  Perfect for long-distance couples, surprise dates, anniversaries, and gift syncing.
                </p>
                <button
                  onClick={() => onNavigate('products')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-colors"
                >
                  Start Dual Order
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900">Shop by Recipient</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => onNavigate('products?search=for+him')}
              className="group relative text-left rounded-3xl overflow-hidden border border-rose-200 bg-gradient-to-r from-rose-900 to-pink-600 p-8 min-h-[260px]"
            >
              <div className="absolute inset-0 bg-rose-100/20"></div>
              <div className="relative h-full flex flex-col justify-between">
                <div className="max-w-[220px]">
                  <span className="inline-flex px-4 py-1 rounded-full bg-amber-100 text-rose-700 font-semibold text-xl leading-none">
                    His
                  </span>
                  <p className="mt-4 text-3xl font-semibold text-white leading-tight">Endless Love</p>
                </div>

                <span className="inline-flex items-center gap-2 text-white font-semibold text-xl">
                  Shop Now
                  <span className="w-7 h-7 rounded-full bg-white text-rose-600 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('products?search=for+her')}
              className="group relative text-left rounded-3xl overflow-hidden border border-rose-200 bg-gradient-to-r from-fuchsia-700 to-pink-500 p-8 min-h-[260px]"
            >
              <div className="absolute inset-0 bg-rose-100/20"></div>
              <div className="relative h-full flex flex-col justify-between">
                <div className="max-w-[220px]">
                  <span className="inline-flex px-4 py-1 rounded-full bg-amber-100 text-rose-700 font-semibold text-xl leading-none">
                    Her
                  </span>
                  <p className="mt-4 text-3xl font-semibold text-white leading-tight">After The Roses</p>
                </div>

                <span className="inline-flex items-center gap-2 text-white font-semibold text-xl">
                  Shop Now
                  <span className="w-7 h-7 rounded-full bg-white text-rose-600 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </div>
            </button>
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
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {[
              { label: 'Birthday', query: 'Birthday' },
              { label: 'Anniversary', query: 'Anniversary' },
              { label: 'Couple Dates Special', query: 'Couple Dates Special' },
              { label: 'Gifts', query: 'Gifts' },
            ].map((occasion) => (
              <button
                key={occasion.label}
                onClick={() => onNavigate(`products?occasion=${encodeURIComponent(occasion.query)}`)}
                className="px-5 py-2.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-sm font-medium hover:bg-rose-100 transition-colors"
              >
                {occasion.label}
              </button>
            ))}
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

      <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-white mx-auto mb-6 fill-white" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Never Miss a Special Moment
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to get exclusive deals, gift ideas, and anniversary reminders
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-rose-500 rounded-full font-medium hover:bg-gray-50 transition-all shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-xl font-bold">LoveNest</span>
              </div>
              <p className="text-gray-400 text-sm">
                One Love. Two Addresses. One Order
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => onNavigate('products')} className="hover:text-white transition-colors">All Products</button></li>
                <li><button onClick={() => onNavigate('products?occasion=Valentine')} className="hover:text-white transition-colors">Valentine's Day</button></li>
                <li><button onClick={() => onNavigate('products?occasion=Anniversary')} className="hover:text-white transition-colors">Anniversary</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button className="hover:text-white transition-colors">Shipping Info</button></li>
                <li><button className="hover:text-white transition-colors">Returns</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>2026 LoveNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
