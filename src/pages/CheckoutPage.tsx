import { useEffect, useState } from 'react';
import { MapPin, CreditCard, Package, ArrowLeft, Plus, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Address, Coupon } from '../types';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export const CheckoutPage = ({ onNavigate }: CheckoutPageProps) => {
  const { cart, cartTotal, clearCart, updateCartItem } = useCart();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);
  const [isDualDelivery, setIsDualDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newAddress, setNewAddress] = useState({
    full_name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'USA',
  });

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });

    if (data) {
      setAddresses(data);
      if (data.length > 0 && selectedAddresses.length === 0) {
        setSelectedAddresses([data[0].id]);
      }
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        ...newAddress,
        user_id: user.id,
      })
      .select()
      .single();

    if (!error && data) {
      setAddresses([...addresses, data]);
      setShowAddAddress(false);
      setNewAddress({
        full_name: '',
        phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'USA',
      });
    }
  };

  const handleApplyCoupon = async () => {
    const { data } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.toUpperCase())
      .eq('is_active', true)
      .maybeSingle();

    if (data && new Date(data.valid_until) > new Date()) {
      if (cartTotal >= data.min_order_amount) {
        setAppliedCoupon(data);
      } else {
        alert(`Minimum order amount is $${data.min_order_amount}`);
      }
    } else {
      alert('Invalid or expired coupon code');
    }
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discount_type === 'percentage') {
      const discount = (cartTotal * appliedCoupon.discount_value) / 100;
      return appliedCoupon.max_discount
        ? Math.min(discount, appliedCoupon.max_discount)
        : discount;
    }
    return appliedCoupon.discount_value;
  };

  const discount = calculateDiscount();
  const subtotal = cartTotal;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const handlePlaceOrder = async () => {
    if (!user) return;
    if (selectedAddresses.length === 0) {
      alert('Please select at least one delivery address');
      return;
    }

    if (isDualDelivery && selectedAddresses.length < 2) {
      alert('Please select two addresses for dual delivery');
      return;
    }

    setLoading(true);

    try {
      const orderNumber = `ORD-${Date.now()}`;

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: user.id,
          total_amount: subtotal,
          discount_amount: discount,
          tax_amount: tax,
          final_amount: total,
          coupon_code: appliedCoupon?.code,
          payment_method: paymentMethod,
          payment_status: paymentMethod === 'cod' ? 'pending' : 'completed',
          order_status: 'confirmed',
          is_dual_delivery: isDualDelivery,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.images?.[0]?.image_url,
        quantity: item.quantity,
        unit_price: item.product.final_price,
        total_price:
          (item.product.final_price +
            (item.personalizationText ? item.product.personalization_price : 0)) *
          item.quantity,
        variant_details: item.selectedVariants,
        personalization_text: item.personalizationText,
        assigned_address_id: item.assignedAddressId || selectedAddresses[0],
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      const addressesToShip = isDualDelivery ? selectedAddresses : [selectedAddresses[0]];

      for (let i = 0; i < addressesToShip.length; i++) {
        const shipmentNumber = `SHIP-${Date.now()}-${i + 1}`;
        await supabase.from('shipments').insert({
          order_id: order.id,
          shipment_number: shipmentNumber,
          address_id: addressesToShip[i],
          status: 'pending',
        });
      }

      await supabase.from('payments').insert({
        order_id: order.id,
        payment_method: paymentMethod,
        amount: total,
        status: paymentMethod === 'cod' ? 'pending' : 'completed',
      });

      clearCart();
      alert('Order placed successfully!');
      onNavigate(`order/${order.order_number}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to checkout</h2>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('cart')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Cart</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-rose-500" />
                  Delivery Address
                </h2>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="flex items-center space-x-1 text-rose-500 hover:text-rose-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add New</span>
                </button>
              </div>

              <div className="mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDualDelivery}
                    onChange={(e) => {
                      setIsDualDelivery(e.target.checked);
                      if (!e.target.checked) {
                        setSelectedAddresses(selectedAddresses.slice(0, 1));
                        cart.forEach((item) => {
                          updateCartItem(item.product.id, { assignedAddressId: undefined });
                        });
                      }
                    }}
                    className="w-5 h-5 text-rose-500 rounded focus:ring-rose-500"
                  />
                  <span className="font-medium text-gray-900">
                    Enable Dual Delivery (Two Addresses)
                  </span>
                </label>
                <p className="text-sm text-gray-600 ml-7 mt-1">
                  Send items to two different addresses in one order
                </p>
              </div>

              {showAddAddress && (
                <form onSubmit={handleAddAddress} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newAddress.full_name}
                      onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    value={newAddress.address_line1}
                    onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Address Line 2 (Optional)"
                    value={newAddress.address_line2}
                    onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={newAddress.postal_code}
                      onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    Save Address
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {addresses.map((address) => (
                  <button
                    key={address.id}
                    onClick={() => {
                      if (isDualDelivery) {
                        if (selectedAddresses.includes(address.id)) {
                          setSelectedAddresses(selectedAddresses.filter((id) => id !== address.id));
                        } else if (selectedAddresses.length < 2) {
                          setSelectedAddresses([...selectedAddresses, address.id]);
                        } else {
                          alert('You can only select up to 2 addresses for dual delivery');
                        }
                      } else {
                        setSelectedAddresses([address.id]);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAddresses.includes(address.id)
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{address.full_name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.address_line1}
                          {address.address_line2 && `, ${address.address_line2}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                      </div>
                      {selectedAddresses.includes(address.id) && (
                        <Check className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {isDualDelivery && selectedAddresses.length === 2 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Package className="w-6 h-6 mr-2 text-rose-500" />
                  Assign Items to Addresses
                </h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded bg-gray-200">
                          {item.product.images?.[0] && (
                            <img
                              src={item.product.images[0].image_url}
                              alt={item.product.name}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {item.product.name}
                        </span>
                      </div>
                      <select
                        value={item.assignedAddressId || selectedAddresses[0]}
                        onChange={(e) =>
                          updateCartItem(item.product.id, {
                            assignedAddressId: e.target.value,
                          })
                        }
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                      >
                        {selectedAddresses.map((addressId, index) => {
                          const address = addresses.find((a) => a.id === addressId);
                          return (
                            <option key={addressId} value={addressId}>
                              Address {index + 1}: {address?.city}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-rose-500" />
                Payment Method
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('online')}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'online'
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Online Payment</p>
                      <p className="text-sm text-gray-600">Pay securely with card</p>
                    </div>
                    {paymentMethod === 'online' && <Check className="w-5 h-5 text-rose-500" />}
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                    {paymentMethod === 'cod' && <Check className="w-5 h-5 text-rose-500" />}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2">
                    Coupon "{appliedCoupon.code}" applied!
                  </p>
                )}
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || selectedAddresses.length === 0}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
