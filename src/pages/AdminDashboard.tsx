import { useEffect, useState } from 'react';
import { DollarSign, Package, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { DashboardStats } from '../types';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchStats();
    }
  }, [profile]);

  const fetchStats = async () => {
    const [ordersData, usersData, productsData] = await Promise.all([
      supabase.from('orders').select('*'),
      supabase.from('profiles').select('*'),
      supabase.from('products').select('*').eq('is_active', true),
    ]);

    const totalRevenue =
      ordersData.data?.reduce(
        (sum, order) =>
          order.payment_status === 'completed' ? sum + parseFloat(order.final_amount) : sum,
        0
      ) || 0;

    const pendingOrders =
      ordersData.data?.filter((o) => o.order_status === 'pending').length || 0;

    const recentOrders = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .order('created_at', { ascending: false })
      .limit(5);

    const topProducts = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('rating_count', { ascending: false })
      .limit(5);

    setStats({
      totalRevenue,
      totalOrders: ordersData.data?.length || 0,
      activeUsers: usersData.data?.length || 0,
      pendingOrders,
      recentOrders: recentOrders.data || [],
      topProducts: topProducts.data || [],
    });

    setLoading(false);
  };

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You do not have admin privileges</p>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              ${stats?.totalRevenue.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats?.totalOrders}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Active Users</p>
            <p className="text-2xl font-bold text-gray-900">{stats?.activeUsers}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats?.pendingOrders}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {stats?.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">#{order.order_number}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${order.final_amount.toFixed(2)}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.order_status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>
            <div className="space-y-3">
              {stats?.topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      {product.rating_count} reviews
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${product.final_price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{product.stock_quantity} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
          <p className="text-white/90 text-sm mb-4">
            Use Supabase dashboard to manage products, orders, coupons, and more.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
              Manage Products
            </button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
              View Orders
            </button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
              Create Coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
