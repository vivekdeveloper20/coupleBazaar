import { useState } from 'react';
import { ArrowLeft, ChevronDown, Search, MessageCircle, Phone, Mail, HelpCircle, Package, CreditCard, Truck, Gift, Heart, Shield, Clock } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

const faqCategories = [
  { id: 'all', name: 'All FAQs', icon: HelpCircle, count: 24 },
  { id: 'orders', name: 'Orders & Delivery', icon: Package, count: 8 },
  { id: 'payments', name: 'Payments', icon: CreditCard, count: 5 },
  { id: 'shipping', name: 'Shipping', icon: Truck, count: 4 },
  { id: 'gifts', name: 'Gift Services', icon: Gift, count: 4 },
  { id: 'returns', name: 'Returns & Refunds', icon: Shield, count: 3 },
];

const faqs = [
  {
    category: 'orders',
    question: 'How do I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order from the "My Orders" section in your account. We provide real-time updates at every step of the delivery process.'
  },
  {
    category: 'orders',
    question: 'What is "Dual Delivery" feature?',
    answer: 'Dual Delivery is our signature feature that allows you to send the same gift to two different addresses in a single order - perfect for couples in long-distance relationships! Both packages are shipped simultaneously with personalized messages for each recipient.'
  },
  {
    category: 'orders',
    question: 'Can I modify my order after placing it?',
    answer: 'You can modify your order within 2 hours of placing it, as long as it hasn\'t been processed for shipping. Go to "My Orders" and click on "Modify Order". After 2 hours, please contact our support team for assistance.'
  },
  {
    category: 'orders',
    question: 'How do I cancel my order?',
    answer: 'Orders can be cancelled within 24 hours of placement if not yet shipped. Go to "My Orders" → Select Order → "Cancel Order". Refunds are processed within 5-7 business days to your original payment method.'
  },
  {
    category: 'orders',
    question: 'What if my order arrives damaged?',
    answer: 'We take utmost care in packaging, but if your order arrives damaged, please take photos and contact us within 48 hours. We\'ll arrange a free replacement or full refund - no questions asked!'
  },
  {
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (GPay, PhonePe, Paytm), Net Banking, Wallets, and Cash on Delivery (COD) for orders under ₹5000. EMI options are available on orders above ₹3000.'
  },
  {
    category: 'payments',
    question: 'Is my payment information secure?',
    answer: 'Absolutely! We use 256-bit SSL encryption and are PCI-DSS compliant. Your card details are never stored on our servers. All transactions are processed through secure payment gateways like Razorpay and PayU.'
  },
  {
    category: 'payments',
    question: 'Can I use multiple payment methods?',
    answer: 'Yes! You can combine store credits, gift cards, or wallet balance with any other payment method. Simply apply your credits first, and pay the remaining amount via your preferred method.'
  },
  {
    category: 'payments',
    question: 'What is your EMI policy?',
    answer: 'We offer No-Cost EMI on orders above ₹3000 with select bank cards. EMI tenure ranges from 3 to 12 months. The EMI option will appear at checkout if your order qualifies.'
  },
  {
    category: 'shipping',
    question: 'What are the delivery charges?',
    answer: 'Standard delivery is FREE on orders above ₹499. For orders below ₹499, a flat ₹49 shipping fee applies. Express delivery (1-2 days) is available at ₹99 extra. Same-day delivery in metro cities costs ₹149.'
  },
  {
    category: 'shipping',
    question: 'How long does delivery take?',
    answer: 'Standard delivery: 4-7 business days. Express delivery: 1-2 business days. Same-day delivery: Order before 2 PM for delivery by 9 PM (available in metro cities). International shipping: 10-15 business days.'
  },
  {
    category: 'shipping',
    question: 'Do you deliver internationally?',
    answer: 'Yes! We ship to 50+ countries including USA, UK, Canada, Australia, UAE, and Singapore. International shipping charges vary by destination and are calculated at checkout. Customs duties may apply.'
  },
  {
    category: 'shipping',
    question: 'Can I schedule delivery for a specific date?',
    answer: 'Yes! During checkout, you can select your preferred delivery date. This is perfect for birthdays, anniversaries, or Valentine\'s Day surprises. Scheduled delivery is available up to 30 days in advance.'
  },
  {
    category: 'gifts',
    question: 'Can I add a personalized message?',
    answer: 'Absolutely! Every order includes a FREE personalized gift card. You can add a message up to 200 characters. Premium handwritten cards and video messages (via QR code) are available at nominal charges.'
  },
  {
    category: 'gifts',
    question: 'Do you offer gift wrapping?',
    answer: 'Yes! All orders come with our signature Couple Bazzar gift packaging at no extra cost. Premium gift boxes with ribbons and dried flowers are available for ₹149. Luxury gift hamper packaging costs ₹299.'
  },
  {
    category: 'gifts',
    question: 'Can I send gifts anonymously?',
    answer: 'Yes! During checkout, you can choose to keep your identity hidden. The recipient will receive the gift with your message but without your name or contact details - perfect for secret admirers!'
  },
  {
    category: 'gifts',
    question: 'Do you have gift cards?',
    answer: 'Yes! Couple Bazzar Gift Cards are available from ₹500 to ₹50,000. They never expire and can be used on any product. Gift cards are delivered instantly via email or SMS - perfect for last-minute gifts!'
  },
  {
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'We offer a 7-day easy return policy on most products. Personalized items and perishables (flowers, chocolates) are non-returnable. Items must be unused and in original packaging. Return shipping is free!'
  },
  {
    category: 'returns',
    question: 'How do I initiate a return?',
    answer: 'Go to "My Orders" → Select Order → "Return Item". Choose your reason and preferred refund method. Our pickup partner will collect the item within 2-3 days. Refunds are processed within 5-7 business days.'
  },
  {
    category: 'returns',
    question: 'When will I receive my refund?',
    answer: 'Refunds are processed within 5-7 business days after we receive the returned item. Credit/Debit card refunds may take additional 2-3 days to reflect. UPI and wallet refunds are instant upon processing.'
  },
];

export function FAQPage({ onNavigate }: FAQPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full mb-6 shadow-2xl shadow-rose-500/30">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              How can we help you?
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to frequently asked questions about orders, shipping, payments, and more.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-rose-200 focus:border-rose-500 focus:ring-0 text-lg shadow-lg transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                <span className="font-medium">{cat.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-rose-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try a different search term or browse by category</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-rose-100"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        openFAQ === idx 
                          ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white' 
                          : 'bg-rose-100 text-rose-500'
                      }`}>
                        <Heart className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-rose-500 flex-shrink-0 transition-transform duration-300 ${
                      openFAQ === idx ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === idx ? 'max-h-96' : 'max-h-0'
                  }`}>
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { icon: Clock, value: '< 24hrs', label: 'Avg Response Time' },
              { icon: MessageCircle, value: '50K+', label: 'Queries Resolved' },
              { icon: Heart, value: '98%', label: 'Satisfaction Rate' },
              { icon: Shield, value: '24/7', label: 'Support Available' },
            ].map((stat, idx) => (
              <div key={idx} className="p-6">
                <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-rose-100 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600">Our support team is always ready to assist you</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-rose-100 group hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-500 text-sm mb-4">Chat with our support team in real-time</p>
              <button className="text-rose-500 font-semibold hover:text-rose-600">Start Chat →</button>
            </div>
            
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-rose-100 group hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm mb-4">Mon-Sat, 9 AM - 9 PM IST</p>
              <a href="tel:+918434487300" className="text-rose-500 font-semibold hover:text-rose-600">+91 84344 87300</a>
            </div>
            
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow border border-rose-100 group hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-500 text-sm mb-4">We reply within 24 hours</p>
              <a href="mailto:support@couplebazzar.com" className="text-rose-500 font-semibold hover:text-rose-600">support@couplebazzar.com</a>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
