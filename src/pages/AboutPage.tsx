import { Heart, Users, Gift, Sparkles, Target, Award, Truck, Shield } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage = ({ onNavigate }: AboutPageProps) => {
  const stats = [
    { number: '50K+', label: 'Happy Couples' },
    { number: '100K+', label: 'Gifts Delivered' },
    { number: '4.9', label: 'Average Rating' },
    { number: '24/7', label: 'Support' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Love First',
      description: 'Every gift we curate is chosen to strengthen bonds and create lasting memories.',
    },
    {
      icon: Sparkles,
      title: 'Quality Excellence',
      description: 'We partner with premium brands to ensure every product exceeds expectations.',
    },
    {
      icon: Target,
      title: 'Personalized Experience',
      description: 'From gift selection to delivery, we tailor every step to your unique love story.',
    },
    {
      icon: Award,
      title: 'Trust & Reliability',
      description: 'Your satisfaction is our priority. We stand behind every gift we deliver.',
    },
  ];

  const features = [
    {
      icon: Gift,
      title: 'Dual Delivery',
      description: 'Send gifts to two addresses simultaneously - perfect for long-distance couples.',
    },
    {
      icon: Truck,
      title: 'Express Shipping',
      description: 'Same-day and next-day delivery options for those last-minute surprises.',
    },
    {
      icon: Shield,
      title: 'Secure Packaging',
      description: 'Premium gift wrapping and secure packaging for every order.',
    },
    {
      icon: Users,
      title: 'Gift Concierge',
      description: 'Personal shopping assistance to find the perfect gift for your loved one.',
    },
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      bio: 'Started Couple Bazzar with a vision to make gifting magical for couples everywhere.',
    },
    {
      name: 'Rahul Verma',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: 'Ensures every gift reaches its destination with care and on time.',
    },
    {
      name: 'Ananya Patel',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      bio: 'Curates our exclusive collections with an eye for beauty and romance.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full mb-8 shadow-2xl shadow-rose-500/30">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Couple Bazzar</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We believe that love deserves to be celebrated every day. Our mission is to help couples 
              express their love through thoughtfully curated gifts that create unforgettable moments.
            </p>
            <p className="text-lg text-gray-500 italic">
              "One Love, Two Addresses" - Because distance should never dim the spark of love.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-rose-200 to-pink-200 rounded-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600" 
                alt="Our Story" 
                className="relative rounded-3xl shadow-2xl w-full object-cover h-[400px]"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Couple Bazzar was born in 2023 from a simple observation: couples in long-distance 
                  relationships struggled to send meaningful gifts to each other. Our founder, Priya, 
                  experienced this firsthand when she couldn't find a platform that could deliver 
                  thoughtful gifts to her partner's doorstep.
                </p>
                <p>
                  What started as a small operation has grown into India's most loved couples gifting 
                  platform. We've helped thousands of couples celebrate their love, from first 
                  anniversaries to golden jubilees, from Valentine's Day surprises to "just because" moments.
                </p>
                <p>
                  Today, we're proud to offer unique features like dual delivery, where one order can 
                  bring joy to two different addresses - perfect for couples who want to unwrap their 
                  gifts together, even when apart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything we do is guided by our commitment to making love stories more beautiful.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group p-8 bg-gradient-to-br from-white to-rose-50 rounded-3xl border border-rose-100 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-rose-500/30">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-rose-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Makes Us Special</h2>
            <p className="text-rose-100 max-w-2xl mx-auto">
              Unique features designed with couples in mind.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-rose-100 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Couple Bazzar who work tirelessly to spread love.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl mx-auto group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-rose-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Make Your Loved One Smile?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Browse our curated collection of gifts and find the perfect way to say "I love you".
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-600 transition-all shadow-xl shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-1"
          >
            <Gift className="w-5 h-5 mr-2" />
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
};
