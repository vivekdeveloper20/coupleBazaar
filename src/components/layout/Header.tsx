import { useState } from 'react';
import { Heart, ShoppingCart, User, Search, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
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
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`products?search=${searchQuery}`);
      setShowMobileMenu(false);
    }
  };

  const toggleMobileSubmenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
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
              <img 
                src="/logo.png" 
                alt="Couple Bazzar Logo" 
                className="h-44 mt-3 object-contain group-hover:scale-110 transition-transform"
              />
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
                  <button onClick={() => onNavigate('premium-collection')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Premium Collection</button>
                  <button onClick={() => onNavigate('couple-collection')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Couple Collection</button>
                  <button onClick={() => onNavigate('limited-edition')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">Limited Edition</button>
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
          <div className="md:hidden border-t border-gray-200 bg-white max-h-[80vh] overflow-y-auto">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 py-3 border-b border-gray-100">
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

            <nav className="px-4 py-4 space-y-1">
              {/* Home */}
              <button
                onClick={() => {
                  onNavigate('home');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
              >
                Home
              </button>

              {/* Shop by Category - Expandable */}
              <div>
                <button
                  onClick={() => toggleMobileSubmenu('category')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
                >
                  <span>Shop by Category</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${expandedMenu === 'category' ? 'rotate-90' : ''}`} />
                </button>
                {expandedMenu === 'category' && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-rose-200 pl-4">
                    <button onClick={() => { onNavigate('products?category=rings'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Rings</button>
                    <button onClick={() => { onNavigate('products?category=necklaces'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Necklaces</button>
                    <button onClick={() => { onNavigate('products?category=bracelets'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Bracelets</button>
                    <button onClick={() => { onNavigate('products?category=earrings'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Earrings</button>
                    <button onClick={() => { onNavigate('products?category=watches'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Watches</button>
                  </div>
                )}
              </div>

              {/* Gifts for Him */}
              <button
                onClick={() => {
                  onNavigate('products?for=him');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
              >
                Gifts for Him
              </button>

              {/* Gifts for Her */}
              <button
                onClick={() => {
                  onNavigate('products?for=her');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
              >
                Gifts for Her
              </button>

              {/* Gift Card */}
              <button
                onClick={() => {
                  onNavigate('gift-card');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
              >
                Gift Card
              </button>

              {/* Gift Store - Expandable */}
              <div>
                <button
                  onClick={() => toggleMobileSubmenu('store')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
                >
                  <span>Gift Store</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${expandedMenu === 'store' ? 'rotate-90' : ''}`} />
                </button>
                {expandedMenu === 'store' && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-rose-200 pl-4">
                    <button onClick={() => { onNavigate('products?occasion=Valentine'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Valentine's Day</button>
                    <button onClick={() => { onNavigate('products?occasion=Anniversary'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Anniversary</button>
                    <button onClick={() => { onNavigate('products?occasion=Birthday'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Birthday</button>
                    <button onClick={() => { onNavigate('products?occasion=Wedding'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Wedding</button>
                  </div>
                )}
              </div>

              {/* Exclusive Collections - Expandable */}
              <div>
                <button
                  onClick={() => toggleMobileSubmenu('exclusive')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
                >
                  <span>Exclusive Collections</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${expandedMenu === 'exclusive' ? 'rotate-90' : ''}`} />
                </button>
                {expandedMenu === 'exclusive' && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-rose-200 pl-4">
                    <button onClick={() => { onNavigate('premium-collection'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Premium Collection</button>
                    <button onClick={() => { onNavigate('couple-collection'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Couple Collection</button>
                    <button onClick={() => { onNavigate('limited-edition'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Limited Edition</button>
                  </div>
                )}
              </div>

              {/* More at Couple Bazzar - Expandable */}
              <div>
                <button
                  onClick={() => toggleMobileSubmenu('more')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
                >
                  <span>More at Couple Bazzar</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${expandedMenu === 'more' ? 'rotate-90' : ''}`} />
                </button>
                {expandedMenu === 'more' && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-rose-200 pl-4">
                    <button onClick={() => { onNavigate('about'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">About Us</button>
                    <button onClick={() => { onNavigate('contact'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Contact</button>
                    <button onClick={() => { onNavigate('blog'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">Blog</button>
                    <button onClick={() => { onNavigate('faq'); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-rose-600">FAQs</button>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-3"></div>

              {/* My Orders */}
              <button
                onClick={() => {
                  onNavigate('orders');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
              >
                My Orders
              </button>

              {/* Wishlist */}
              <button
                onClick={() => {
                  onNavigate('wishlist');
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg font-medium"
              >
                Wishlist
              </button>

              {/* Sign In/Out */}
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium mt-4"
                >
                  Sign In
                </button>
              )}
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
