import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { FAQPage } from './pages/FAQPage';
import PremiumCollectionPage from './pages/PremiumCollectionPage';
import CoupleCollectionPage from './pages/CoupleCollectionPage';
import LimitedEditionPage from './pages/LimitedEditionPage';
import GiftCardPage from './pages/GiftCardPage';
import { isSupabaseConfigured } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentPage('home');
      } else {
        const parts = path.split('/').filter(Boolean);
        setCurrentPage(parts[0]);
        if (parts[1]) {
          setPageParams({ slug: parts[1] });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: string) => {
    if (page.includes('/')) {
      const [pageName, param] = page.split('/');
      setCurrentPage(pageName);
      setPageParams({ slug: param });
      window.history.pushState({}, '', `/${page}`);
    } else if (page.includes('?')) {
      const [pageName, query] = page.split('?');
      setCurrentPage(pageName);
      const params = new URLSearchParams(query);
      const paramsObj: { [key: string]: string } = {};
      params.forEach((value, key) => {
        paramsObj[key] = value;
      });
      setPageParams(paramsObj);
      window.history.pushState({}, '', `/${page}`);
    } else {
      setCurrentPage(page);
      setPageParams({});
      window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    const searchParams = Object.keys(pageParams).length > 0
      ? new URLSearchParams(pageParams)
      : undefined;

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'products':
        return <ProductsPage onNavigate={navigate} searchParams={searchParams} />;
      case 'product':
        return <ProductDetailPage slug={pageParams.slug} onNavigate={navigate} />;
      case 'cart':
        return <CartPage onNavigate={navigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={navigate} />;
      case 'orders':
        return <OrdersPage onNavigate={navigate} />;
      case 'order':
        return <OrdersPage onNavigate={navigate} />;
      case 'wishlist':
        return <WishlistPage onNavigate={navigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={navigate} />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      case 'blog':
        return <BlogPage onNavigate={navigate} />;
      case 'faq':
        return <FAQPage onNavigate={navigate} />;
      case 'premium-collection':
        return <PremiumCollectionPage onNavigate={navigate} onAddToCart={() => {}} onAddToWishlist={() => {}} />;
      case 'couple-collection':
        return <CoupleCollectionPage onNavigate={navigate} onAddToCart={() => {}} onAddToWishlist={() => {}} />;
      case 'limited-edition':
        return <LimitedEditionPage onNavigate={navigate} onAddToCart={() => {}} onAddToWishlist={() => {}} />;
      case 'gift-card':
        return <GiftCardPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          {!isSupabaseConfigured && (
            <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
              <div className="rounded-lg border border-yellow-200 bg-yellow-100 px-4 py-3 text-sm text-yellow-800">
                Frontend mode is active. Add <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> in a <strong>.env</strong> file to enable backend data.
              </div>
            </div>
          )}
          <Header onNavigate={navigate} currentPage={currentPage} />
          {renderPage()}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
