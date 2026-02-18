import { useEffect, useState } from 'react';
import { Star, Heart, ShoppingCart, Package, Shield, Truck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Review, ProductVariant } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (page: string) => void;
}

export const ProductDetailPage = ({ slug, onNavigate }: ProductDetailPageProps) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [personalizationText, setPersonalizationText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [slug]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from('products')
      .select('*, images:product_images(*), variants:product_variants(*), category:categories(*)')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (data) {
      setProduct(data as Product);
    }
    setLoading(false);
  };

  const fetchReviews = async () => {
    const { data: productData } = await supabase
      .from('products')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (productData) {
      const { data } = await supabase
        .from('reviews')
        .select(`
          *,
          user:profiles(full_name, avatar_url)
        `)
        .eq('product_id', productData.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        setReviews(data as Review[]);
      }
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      product,
      quantity,
      selectedVariants: Object.keys(selectedVariants).length > 0 ? selectedVariants : undefined,
      personalizationText: personalizationText || undefined,
    });

    alert('Added to cart!');
  };

  const groupedVariants = product?.variants?.reduce((acc, variant) => {
    if (!acc[variant.variant_type]) {
      acc[variant.variant_type] = [];
    }
    acc[variant.variant_type].push(variant);
    return acc;
  }, {} as { [key: string]: ProductVariant[] });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-rose-500 hover:text-rose-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-white">
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[selectedImage]?.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-rose-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating_average)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating_average.toFixed(1)} ({product.rating_count} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.final_price.toFixed(2)}
              </span>
              {product.discount_percentage > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.base_price.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 bg-rose-500 text-white rounded-full text-sm font-medium">
                    Save {product.discount_percentage}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {groupedVariants && Object.keys(groupedVariants).length > 0 && (
              <div className="space-y-4">
                {Object.entries(groupedVariants).map(([type, variants]) => (
                  <div key={type}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {type}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [type]: variant.variant_value,
                            }))
                          }
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedVariants[type] === variant.variant_value
                              ? 'border-rose-500 bg-rose-50 text-rose-600'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {variant.variant_value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {product.allows_personalization && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personalization (Optional) +${product.personalization_price.toFixed(2)}
                </label>
                <input
                  type="text"
                  value={personalizationText}
                  onChange={(e) => setPersonalizationText(e.target.value)}
                  placeholder="Enter your custom text..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  maxLength={50}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {personalizationText.length}/50 characters
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
                <span className="text-sm text-gray-600">
                  {product.stock_quantity} available
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-500/30 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-rose-500 hover:bg-rose-50 transition-colors">
                <Heart className="w-6 h-6 text-rose-500" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-start space-x-3">
                <Truck className="w-6 h-6 text-rose-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Package className="w-6 h-6 text-rose-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Dual Delivery</p>
                  <p className="text-xs text-gray-600">Two addresses, one order</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-rose-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.user?.full_name || 'Anonymous'}
                      </p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
