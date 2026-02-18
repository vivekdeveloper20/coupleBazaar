import { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { WishlistItem } from '../types';

interface WishlistPageProps {
  onNavigate: (page: string) => void;
}

export const WishlistPage = ({ onNavigate }: WishlistPageProps) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('wishlist')
      .select(`
        *,
        product:products(*, images:product_images(*))
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setWishlist(data as WishlistItem[]);
    }
    setLoading(false);
  };

  const removeFromWishlist = async (id: string) => {
    await supabase.from('wishlist').delete().eq('id', id);
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item: WishlistItem) => {
    if (item.product) {
      addToCart({
        product: item.product,
        quantity: 1,
      });
      alert('Added to cart!');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to view wishlist
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love for later</p>
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="group">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  {item.product?.images?.[0] && (
                    <img
                      src={item.product.images[0].image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                <button
                  onClick={() => item.product && onNavigate(`product/${item.product.slug}`)}
                  className="text-left w-full mb-3"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors">
                    {item.product?.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    ${item.product?.final_price.toFixed(2)}
                  </p>
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
