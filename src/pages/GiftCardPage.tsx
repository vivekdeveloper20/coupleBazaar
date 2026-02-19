import { useState } from 'react';
import { ArrowLeft, Gift, CreditCard, Send, Sparkles, Heart, Star, Check, Mail, MessageCircle, ChevronRight } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

interface GiftCardPageProps {
  onNavigate: (page: string) => void;
}

const giftCardAmounts = [500, 1000, 2000, 3000, 5000, 10000];

const giftCardDesigns = [
  { id: 1, name: 'Love Forever', gradient: 'from-rose-500 via-pink-500 to-rose-500', emoji: '💕' },
  { id: 2, name: 'Anniversary Special', gradient: 'from-purple-500 via-pink-500 to-purple-500', emoji: '💍' },
  { id: 3, name: 'Birthday Love', gradient: 'from-amber-500 via-orange-500 to-rose-500', emoji: '🎂' },
  { id: 4, name: 'Valentine Magic', gradient: 'from-red-500 via-rose-500 to-pink-500', emoji: '❤️' },
  { id: 5, name: 'Celebration', gradient: 'from-indigo-500 via-purple-500 to-pink-500', emoji: '🎉' },
  { id: 6, name: 'Premium Gold', gradient: 'from-amber-400 via-yellow-500 to-amber-600', emoji: '✨' },
];

const features = [
  { icon: Gift, title: 'Instant Delivery', desc: 'Send via Email or SMS instantly' },
  { icon: CreditCard, title: 'No Expiry', desc: 'Use anytime, never expires' },
  { icon: Heart, title: 'Personal Touch', desc: 'Add custom message & design' },
  { icon: Sparkles, title: 'Any Occasion', desc: 'Perfect for all celebrations' },
];

const testimonials = [
  { name: 'Priya S.', text: 'Best gift for my long-distance relationship! So easy to send.', rating: 5 },
  { name: 'Rahul M.', text: 'Saved my anniversary! Instant delivery was a lifesaver.', rating: 5 },
  { name: 'Anita K.', text: 'Beautiful designs and my partner loved the personal message.', rating: 5 },
];

export default function GiftCardPage({ onNavigate }: GiftCardPageProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(2000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedDesign, setSelectedDesign] = useState<number>(1);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'sms'>('email');

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;
  const currentDesign = giftCardDesigns.find(d => d.id === selectedDesign);

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
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-rose-500" />
                <span className="text-rose-600 font-medium">Perfect Gift of Love</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">Couple Bazzar</span>
                <br />
                <span className="text-gray-900">Gift Card</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Give the gift of choice! Let your loved one pick their perfect romantic gift 
                from our exclusive collection. Instant delivery, beautiful designs, endless possibilities.
              </p>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Never Expires</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Fully Customizable</span>
                </div>
              </div>
            </div>

            {/* Animated Gift Card Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <div 
                className={`relative bg-gradient-to-r ${currentDesign?.gradient} rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-500`}
                style={{ aspectRatio: '1.6/1' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative h-full flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <img src="/logo.png" alt="Logo" className="h-8 object-contain brightness-0 invert" />
                      </div>
                      <p className="text-white/80 text-sm">Gift Card</p>
                    </div>
                    <span className="text-4xl">{currentDesign?.emoji}</span>
                  </div>
                  
                  <div>
                    <p className="text-white/80 text-sm mb-1">Card Value</p>
                    <p className="text-4xl font-bold">₹{finalAmount.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/60 text-xs">FOR</p>
                      <p className="font-medium">{recipientName || 'Your Loved One'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs">FROM</p>
                      <p className="font-medium">{senderName || 'With Love'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl mb-4 shadow-lg shadow-rose-500/30">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Card Builder */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Create Your <span className="text-rose-500">Gift Card</span>
            </h2>
            <p className="text-gray-600">Customize every detail to make it special</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="space-y-8">
              {/* Amount Selection */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-rose-500" />
                  Select Amount
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {giftCardAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        selectedAmount === amount && !customAmount
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                          : 'bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-600'
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              {/* Design Selection */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  Choose Design
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {giftCardDesigns.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => setSelectedDesign(design.id)}
                      className={`relative p-4 rounded-xl transition-all ${
                        selectedDesign === design.id
                          ? 'ring-2 ring-rose-500 ring-offset-2'
                          : 'hover:scale-105'
                      }`}
                    >
                      <div className={`h-16 rounded-lg bg-gradient-to-r ${design.gradient} flex items-center justify-center text-2xl shadow-md`}>
                        {design.emoji}
                      </div>
                      <p className="text-xs text-gray-600 mt-2 text-center">{design.name}</p>
                      {selectedDesign === design.id && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Details */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Recipient Details
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Recipient's Name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-0 transition-colors"
                  />
                  
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => setDeliveryMethod('email')}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                        deliveryMethod === 'email'
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Mail className="w-5 h-5" />
                      Email
                    </button>
                    <button
                      onClick={() => setDeliveryMethod('sms')}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                        deliveryMethod === 'sms'
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <MessageCircle className="w-5 h-5" />
                      SMS
                    </button>
                  </div>
                  
                  <input
                    type={deliveryMethod === 'email' ? 'email' : 'tel'}
                    placeholder={deliveryMethod === 'email' ? "Recipient's Email" : "Recipient's Phone"}
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              {/* Sender & Message */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5 text-rose-500" />
                  Your Details & Message
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-0 transition-colors"
                  />
                  <textarea
                    placeholder="Add a personal message (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:ring-0 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Preview & Purchase */}
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Live Preview Card */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                <div 
                  className={`bg-gradient-to-r ${currentDesign?.gradient} rounded-2xl p-6 shadow-xl`}
                  style={{ aspectRatio: '1.6/1' }}
                >
                  <div className="h-full flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <img src="/logo.png" alt="Logo" className="h-6 object-contain brightness-0 invert mb-1" />
                        <p className="text-white/80 text-xs">Gift Card</p>
                      </div>
                      <span className="text-2xl">{currentDesign?.emoji}</span>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs">Card Value</p>
                      <p className="text-2xl font-bold">₹{finalAmount.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-end text-sm">
                      <div>
                        <p className="text-white/60 text-xs">FOR</p>
                        <p className="font-medium">{recipientName || 'Recipient'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60 text-xs">FROM</p>
                        <p className="font-medium">{senderName || 'Sender'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {message && (
                  <div className="mt-4 p-4 bg-rose-50 rounded-xl">
                    <p className="text-sm text-gray-600 italic">"{message}"</p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Gift Card Value</span>
                    <span>₹{finalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Design</span>
                    <span>{currentDesign?.name}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="capitalize">{deliveryMethod}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-rose-500">₹{finalAmount.toLocaleString()}</span>
                  </div>
                </div>
                
                <button className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2">
                  <Gift className="w-5 h-5" />
                  Purchase Gift Card
                </button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  Instant delivery within seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Loved by Thousands of Couples 💕
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/90 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It <span className="text-rose-500">Works</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Choose Amount', desc: 'Select any value from ₹500 to ₹50,000', icon: '💰' },
              { step: 2, title: 'Pick Design', desc: 'Choose from beautiful card designs', icon: '🎨' },
              { step: 3, title: 'Add Message', desc: 'Write a heartfelt personal message', icon: '💌' },
              { step: 4, title: 'Send Instantly', desc: 'Deliver via email or SMS in seconds', icon: '🚀' },
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-rose-500 text-white rounded-full text-sm font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                {idx < 3 && (
                  <ChevronRight className="hidden md:block absolute top-1/3 -right-4 w-8 h-8 text-rose-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-rose-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'How long does delivery take?', a: 'Gift cards are delivered instantly via email or SMS within seconds of purchase.' },
              { q: 'Do gift cards expire?', a: 'No! Couple Bazzar gift cards never expire. Use them anytime.' },
              { q: 'Can I use multiple gift cards?', a: 'Yes, you can combine multiple gift cards in a single order.' },
              { q: 'What if the recipient doesn\'t receive it?', a: 'You can resend the gift card anytime from your order history, or contact our support.' },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
