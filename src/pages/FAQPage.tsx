import { useState } from 'react';
import { ChevronDown, Search, ShoppingBag, Truck, CreditCard, RefreshCw, Gift, Shield, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

export const FAQPage = ({ onNavigate }: FAQPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);

  const toggleFAQ = (id: number) => {
    setOpenFAQs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'orders', name: 'Orders & Tracking', icon: ShoppingBag },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Truck },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'returns', name: 'Returns & Refunds', icon: RefreshCw },
    { id: 'gifts', name: 'Gift Services', icon: Gift },
    { id: 'account', name: 'Account & Security', icon: Shield },
  ];

  const faqs = [
    // Orders & Tracking
    {
      id: 1,
      category: 'orders',
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you\'ll receive a tracking number via email and SMS. You can also track your order by logging into your account and visiting the "My Orders" section. Click on any order to see real-time tracking information including the current location and estimated delivery time.',
    },
    {
      id: 2,
      category: 'orders',
      question: 'Can I modify or cancel my order after placing it?',
      answer: 'You can modify or cancel your order within 2 hours of placing it, as long as it hasn\'t been processed for shipping. To make changes, go to "My Orders" in your account and click "Modify Order" or "Cancel Order". After 2 hours, please contact our support team for assistance.',
    },
    {
      id: 3,
      category: 'orders',
      question: 'What happens if I\'m not available for delivery?',
      answer: 'Our delivery partner will attempt delivery 3 times. If you\'re unavailable, the package will be held at the nearest pickup point for 7 days. You\'ll receive notifications about alternate delivery options. You can also reschedule delivery through the tracking page.',
    },
    
    // Shipping & Delivery
    {
      id: 4,
      category: 'shipping',
      question: 'What are the delivery charges?',
      answer: 'We offer FREE standard delivery on orders above ₹999. For orders below ₹999, a flat delivery fee of ₹79 applies. Express delivery (same-day/next-day) is available at ₹149 in select cities. International shipping rates vary by destination.',
    },
    {
      id: 5,
      category: 'shipping',
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days for major cities and 5-7 days for other locations. Express delivery options include: Same-day delivery (order before 12 PM), Next-day delivery (order before 6 PM). During peak seasons, delivery may take 1-2 additional days.',
    },
    {
      id: 6,
      category: 'shipping',
      question: 'Do you deliver to all locations in India?',
      answer: 'Yes! We deliver to 15,000+ pin codes across India. For remote areas, delivery may take slightly longer. Enter your pin code on the product page to check delivery availability and estimated time for your location.',
    },
    {
      id: 7,
      category: 'shipping',
      question: 'What is Dual Delivery and how does it work?',
      answer: 'Dual Delivery is our unique feature for couples! When you place an order, you can add two delivery addresses. We\'ll send identical or different items to both addresses, perfect for long-distance couples who want to open gifts together virtually. Additional shipping charges may apply for the second address.',
    },
    
    // Payments
    {
      id: 8,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including: Credit/Debit Cards (Visa, Mastercard, Rupay), UPI (Google Pay, PhonePe, Paytm), Net Banking, Wallets (Paytm, Amazon Pay, Mobikwik), EMI options on select cards, and Cash on Delivery (for orders up to ₹10,000).',
    },
    {
      id: 9,
      category: 'payments',
      question: 'Is it safe to pay online on Couple Bazzar?',
      answer: 'Absolutely! We use industry-standard 256-bit SSL encryption to protect your payment information. We\'re PCI-DSS compliant and never store your complete card details. All transactions are processed through secure payment gateways like Razorpay.',
    },
    {
      id: 10,
      category: 'payments',
      question: 'Can I use multiple payment methods for one order?',
      answer: 'Currently, we support one payment method per order. However, you can combine store credits, gift cards, or discount coupons with any payment method. Wallet + Card split payment will be available soon!',
    },
    
    // Returns & Refunds
    {
      id: 11,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer hassle-free returns within 7 days of delivery for most products. Items must be unused, in original packaging with all tags intact. Personalized items, perishables (flowers, chocolates), and intimate products are non-returnable. Initiate returns from "My Orders" section.',
    },
    {
      id: 12,
      category: 'returns',
      question: 'How long does it take to process a refund?',
      answer: 'Once we receive your returned item and verify its condition, refunds are processed within 2-3 business days. The amount will be credited to your original payment method within: 5-7 days for cards/net banking, 1-2 days for UPI/wallets, instant for store credits.',
    },
    {
      id: 13,
      category: 'returns',
      question: 'What if I receive a damaged or wrong product?',
      answer: 'We sincerely apologize if this happens! Please report damaged/wrong items within 48 hours of delivery with photos. We\'ll arrange a free pickup and send the correct item or issue a full refund. Contact us via chat or call our support line for immediate assistance.',
    },
    
    // Gift Services
    {
      id: 14,
      category: 'gifts',
      question: 'Can I add a personalized message to my gift?',
      answer: 'Yes! During checkout, you\'ll find an option to add a free personalized gift message (up to 200 characters). For video messages, you can upload a short video (up to 30 seconds) that the recipient can view via QR code on the gift card. Premium handwritten cards are available at ₹49.',
    },
    {
      id: 15,
      category: 'gifts',
      question: 'Do you offer gift wrapping?',
      answer: 'All orders come with complimentary standard gift wrapping. Premium gift wrapping options include: Luxury Box (₹99), Premium Hamper Style (₹149), and Surprise Balloon Box (₹249). Select your preferred wrapping during checkout.',
    },
    {
      id: 16,
      category: 'gifts',
      question: 'Can I schedule a gift delivery for a specific date?',
      answer: 'Absolutely! You can schedule delivery up to 30 days in advance. During checkout, select your preferred delivery date. For special occasions like Valentine\'s Day, we recommend scheduling at least a week ahead due to high demand.',
    },
    {
      id: 17,
      category: 'gifts',
      question: 'What if the recipient is not home for a surprise delivery?',
      answer: 'We\'ll coordinate with you! Our delivery partners are trained to handle surprise deliveries. You\'ll receive real-time updates, and if the recipient is unavailable, we\'ll contact you to reschedule. For critical surprise deliveries, consider our "Confirmed Delivery" add-on.',
    },
    
    // Account & Security
    {
      id: 18,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Sign In" on the top right, then select "Create Account". You can register using your email, phone number, or sign in with Google/Facebook. Creating an account lets you track orders, save addresses, earn rewards, and get personalized recommendations.',
    },
    {
      id: 19,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Sign In", then "Forgot Password". Enter your registered email or phone number. You\'ll receive a 6-digit OTP to verify your identity. After verification, you can set a new password. For security, we recommend using a strong password with letters, numbers, and special characters.',
    },
    {
      id: 20,
      category: 'account',
      question: 'How is my personal information protected?',
      answer: 'Your privacy is our priority. We use enterprise-grade encryption for all data storage. We never share your personal information with third parties for marketing. You can manage your data preferences in Account Settings. Read our Privacy Policy for complete details.',
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 py-20">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <HelpCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How Can We Help You?
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Find answers to frequently asked questions or reach out to our support team.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your question..."
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white shadow-2xl text-lg focus:ring-4 focus:ring-white/30 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div 
                key={faq.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  openFAQs.includes(faq.id) ? 'ring-2 ring-rose-500' : ''
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-rose-500 flex-shrink-0 transition-transform duration-300 ${
                      openFAQs.includes(faq.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQs.includes(faq.id) ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try a different search term or browse categories above.</p>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600">Our support team is here to help you 24/7</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/30">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Get instant answers from our team</p>
              <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all">
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-4">We respond within 24 hours</p>
              <button 
                onClick={() => onNavigate('contact')}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                Contact Us
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-4">Mon-Sat, 9 AM - 9 PM</p>
              <a href="tel:+919876543210" className="block w-full py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-violet-600 transition-all">
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Track Order', 'Shipping Info', 'Return Policy', 'Payment Options', 'Gift Wrapping', 'Dual Delivery', 'Schedule Delivery', 'Secure Payment'].map((topic) => (
              <button
                key={topic}
                className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-medium rounded-full hover:from-rose-50 hover:to-pink-50 hover:text-rose-600 transition-all border border-gray-200"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
