import { useState } from 'react';
import { Calendar, ArrowRight, Heart, Clock, Tag, Search, TrendingUp } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export const BlogPage = ({ onNavigate }: BlogPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'gift-ideas', name: 'Gift Ideas' },
    { id: 'relationship', name: 'Relationship Tips' },
    { id: 'occasions', name: 'Special Occasions' },
    { id: 'diy', name: 'DIY & Crafts' },
  ];

  const featuredPost = {
    id: 1,
    title: '50 Romantic Gift Ideas to Make Your Partner Feel Special',
    excerpt: 'Discover the ultimate guide to choosing the perfect romantic gift. From personalized keepsakes to experience-based presents, find inspiration for every occasion and budget.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200',
    author: 'Priya Sharma',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    date: 'Feb 15, 2026',
    readTime: '8 min read',
    category: 'Gift Ideas',
  };

  const blogPosts = [
    {
      id: 2,
      title: 'The Art of Long-Distance Gifting: Tips for Couples Apart',
      excerpt: 'Being in a long-distance relationship doesn\'t mean you can\'t surprise your partner. Learn how to make gift-giving meaningful across miles.',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600',
      author: 'Rahul Verma',
      date: 'Feb 12, 2026',
      readTime: '6 min read',
      category: 'Relationship Tips',
    },
    {
      id: 3,
      title: 'Valentine\'s Day 2026: Top Trending Gifts for Couples',
      excerpt: 'Explore this year\'s most popular Valentine\'s Day gifts that are capturing hearts worldwide.',
      image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600',
      author: 'Ananya Patel',
      date: 'Feb 10, 2026',
      readTime: '5 min read',
      category: 'Special Occasions',
    },
    {
      id: 4,
      title: 'DIY Gift Wrapping Ideas That Say "I Love You"',
      excerpt: 'Transform your gifts with these creative wrapping techniques that add a personal touch to any present.',
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600',
      author: 'Priya Sharma',
      date: 'Feb 8, 2026',
      readTime: '4 min read',
      category: 'DIY & Crafts',
    },
    {
      id: 5,
      title: 'Anniversary Gift Guide: From First Year to Golden Jubilee',
      excerpt: 'Whether it\'s paper or gold, find the perfect anniversary gift with our comprehensive guide by year.',
      image: 'https://images.unsplash.com/photo-1522057306606-8d84dca13fcf?w=600',
      author: 'Rahul Verma',
      date: 'Feb 5, 2026',
      readTime: '7 min read',
      category: 'Special Occasions',
    },
    {
      id: 6,
      title: '10 Personalized Gifts That Create Lasting Memories',
      excerpt: 'Custom gifts show extra thought and effort. Discover personalization ideas that will touch their heart.',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600',
      author: 'Ananya Patel',
      date: 'Feb 3, 2026',
      readTime: '5 min read',
      category: 'Gift Ideas',
    },
    {
      id: 7,
      title: 'How to Plan the Perfect Surprise for Your Partner',
      excerpt: 'Master the art of surprising your loved one with these foolproof planning tips and ideas.',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600',
      author: 'Priya Sharma',
      date: 'Jan 30, 2026',
      readTime: '6 min read',
      category: 'Relationship Tips',
    },
    {
      id: 8,
      title: 'Budget-Friendly Romance: Thoughtful Gifts Under ₹1000',
      excerpt: 'Love doesn\'t have a price tag. Find meaningful gifts that show you care without breaking the bank.',
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600',
      author: 'Rahul Verma',
      date: 'Jan 28, 2026',
      readTime: '5 min read',
      category: 'Gift Ideas',
    },
  ];

  const trendingTopics = [
    'Valentine\'s Day 2026',
    'Long Distance Gifts',
    'Personalized Jewelry',
    'Experience Gifts',
    'Couple Activities',
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase().includes(selectedCategory.replace('-', ' '));
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            Love & Lifestyle Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stories of Love & <br className="hidden md:block" />Perfect Gifting
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Discover gift ideas, relationship tips, and inspiration to make every moment with your loved one special.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white shadow-xl focus:ring-4 focus:ring-white/30 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Post */}
            <article className="group relative bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium rounded-full">
                    Featured
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-3">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-rose-200 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-white/80 text-sm">
                    <div className="flex items-center space-x-2">
                      <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-8 h-8 rounded-full" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                <button className="inline-flex items-center text-rose-500 font-semibold group-hover:text-rose-600 transition-colors">
                  Read More 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </article>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              </div>
            )}

            {/* Load More */}
            <div className="text-center pt-8">
              <button className="px-8 py-3 bg-white border-2 border-rose-500 text-rose-500 font-semibold rounded-full hover:bg-rose-500 hover:text-white transition-all">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-rose-500" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <button 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 text-sm font-medium rounded-full hover:from-rose-100 hover:to-pink-100 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Love Tips Weekly</h3>
              <p className="text-white/80 text-sm mb-4">
                Get the best gift ideas and relationship tips delivered to your inbox every week.
              </p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:border-white mb-3"
              />
              <button className="w-full py-3 bg-white text-rose-500 font-semibold rounded-xl hover:bg-white/90 transition-colors">
                Subscribe Now
              </button>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Most Popular</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 4).map((post, index) => (
                  <div key={post.id} className="flex items-start space-x-3 group cursor-pointer">
                    <span className="text-2xl font-bold text-rose-200 group-hover:text-rose-500 transition-colors">
                      0{index + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm group-hover:text-rose-500 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{post.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-rose-500" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Romance', 'Gifts', 'DIY', 'Anniversary', 'Valentine', 'Wedding', 'Birthday', 'Surprise', 'Jewelry', 'Flowers'].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-rose-100 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
      <Footer onNavigate={onNavigate} />
    </>
  );
};
