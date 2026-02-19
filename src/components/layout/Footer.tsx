import { Heart, Truck, Gift, Package, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Top Section - Features */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:from-rose-500/30 group-hover:to-pink-500/30 transition-colors">
                <Truck className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Free Shipping</h4>
                <p className="text-sm text-gray-400">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:from-rose-500/30 group-hover:to-pink-500/30 transition-colors">
                <Gift className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Gift Wrapping</h4>
                <p className="text-sm text-gray-400">Premium packaging</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:from-rose-500/30 group-hover:to-pink-500/30 transition-colors">
                <Package className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Easy Returns</h4>
                <p className="text-sm text-gray-400">7-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:from-rose-500/30 group-hover:to-pink-500/30 transition-colors">
                <Heart className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Love Guarantee</h4>
                <p className="text-sm text-gray-400">100% satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://drive.google.com/uc?export=view&id=1BwGRbYgmVZcMG4ICQy_JLDcMK-VfgZvg" 
                alt="Couple Bazzar Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Couple Bazzar</span>
                <p className="text-xs text-gray-500">Couple Gifting Platform</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              One Love. Two Addresses. One Order. Making couple gifting magical with dual delivery and curated romantic collections.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z', name: 'Twitter' },
                { icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', name: 'Instagram' },
                { icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z', name: 'Facebook' },
                { icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z', name: 'YouTube' },
              ].map((social, idx) => (
                <button
                  key={idx}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-rose-500 hover:to-pink-500 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              Shop
            </h3>
            <ul className="space-y-3 text-sm">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Valentine Special', 'Anniversary Gifts', 'Birthday Gifts'].map((item) => (
                <li key={item}>
                  <button onClick={() => onNavigate('products')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200 flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              Categories
            </h3>
            <ul className="space-y-3 text-sm">
              {['Jewelry', 'Flowers', 'Chocolates', 'Personalized', 'Handmade', 'Couple Sets'].map((item) => (
                <li key={item}>
                  <button onClick={() => onNavigate('products')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate('faq')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('orders')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Track Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Shipping Info
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Returns
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Our Story
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Blog
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Press
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-rose-400 hover:translate-x-1 transition-all duration-200">
                  Partners
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* App Download & Payment */}
        <div className="mt-16 pt-10 border-t border-gray-800">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Download App */}
            <div>
              <h4 className="text-white font-semibold mb-4">Download Our App</h4>
              <div className="flex gap-4">
                <button className="flex items-center gap-3 px-5 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors group">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="text-sm font-semibold text-white">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 px-5 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors group">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.609-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.807 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="text-sm font-semibold text-white">Google Play</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-white font-semibold mb-4">Secure Payments</h4>
              <div className="flex flex-wrap items-center gap-4">
                {['Visa', 'Mastercard', 'UPI', 'PayPal', 'GPay', 'COD'].map((method) => (
                  <div key={method} className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-400">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>© 2026 Couple Bazzar.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>in India</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((link) => (
                <button key={link} className="hover:text-rose-400 transition-colors">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
