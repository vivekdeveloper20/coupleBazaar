import { useState } from 'react';
import { Heart, ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { LoginModal } from '../auth/LoginModal';
import { SignupModal } from '../auth/SignupModal';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`products?search=${searchQuery}`);
    }
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Couple Bazzar
                </h1>
                <p className="text-xs text-gray-500">One Love, Two Addresses</p>
              </div>
            </button>

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for gifts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                />
              </div>
            </form>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('wishlist')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <Heart className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={() => onNavigate('cart')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="relative group">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <User className="w-6 h-6 text-gray-700" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={() => onNavigate('orders')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => onNavigate('profile')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <nav className="hidden md:flex items-center justify-center space-x-8 pb-4 pt-2 border-t border-gray-100">
            {/* Shop by Category - Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-[15px] font-medium text-stone-600 hover:text-stone-800 transition-colors py-2">
                <span>Shop by Category</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[180px]">
                  <button onClick={() => onNavigate('products?category=rings')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Rings</button>
                  <button onClick={() => onNavigate('products?category=necklaces')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Necklaces</button>
                  <button onClick={() => onNavigate('products?category=bracelets')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Bracelets</button>
                  <button onClick={() => onNavigate('products?category=earrings')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Earrings</button>
                  <button onClick={() => onNavigate('products?category=watches')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Watches</button>
                </div>
              </div>
            </div>

            {/* Gifts for Him */}
            <button
              onClick={() => onNavigate('products?for=him')}
              className="text-[15px] font-medium text-stone-600 hover:text-stone-800 transition-colors py-2"
            >
              Gifts for Him
            </button>

            {/* Gifts for Her */}
            <button
              onClick={() => onNavigate('products?for=her')}
              className="text-[15px] font-medium text-stone-600 hover:text-stone-800 transition-colors py-2"
            >
              Gifts for Her
            </button>

            {/* Gift Card */}
            <button
              onClick={() => onNavigate('gift-card')}
              className="text-[15px] font-medium text-stone-600 hover:text-stone-800 transition-colors py-2"
            >
              Couple Bazzar Gift Card
            </button>

            {/* Gift Store - Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-[15px] font-medium text-stone-600 hover:text-stone-800 transition-colors py-2">
                <span>Gift Store</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[180px]">
                  <button onClick={() => onNavigate('products?occasion=Valentine')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Valentine's Day</button>
                  <button onClick={() => onNavigate('products?occasion=Anniversary')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Anniversary</button>
                  <button onClick={() => onNavigate('products?occasion=Birthday')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Birthday</button>
                  <button onClick={() => onNavigate('products?occasion=Wedding')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Wedding</button>
                </div>
              </div>
            </div>

            {/* Exclusive Collections - Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-[15px] font-medium text-stone-600 hover:text-stone-800 transition-colors py-2">
                <span>Exclusive Collections</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[180px]">
                  <button onClick={() => onNavigate('products?collection=premium')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Premium Collection</button>
                  <button onClick={() => onNavigate('products?collection=couple')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Couple Collection</button>
                  <button onClick={() => onNavigate('products?collection=limited')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Limited Edition</button>
                </div>
              </div>
            </div>

            {/* More at Couple Bazzar - Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-[15px] font-medium text-stone-600 hover:text-stone-800 transition-colors py-2">
                <span>More at Couple Bazzar</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[180px]">
                  <button onClick={() => onNavigate('about')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">About Us</button>
                  <button onClick={() => onNavigate('contact')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Contact</button>
                  <button onClick={() => onNavigate('blog')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Blog</button>
                  <button onClick={() => onNavigate('faq')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">FAQs</button>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('products');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Shop All
              </button>
            </nav>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </>
  );
};
