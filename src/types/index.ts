export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_id?: string;
  base_price: number;
  discount_percentage: number;
  final_price: number;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  occasion?: string[];
  allows_personalization: boolean;
  personalization_price: number;
  rating_average: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  category?: Category;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_type: string;
  variant_value: string;
  price_adjustment: number;
  stock_quantity: number;
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  total_amount: number;
  discount_amount: number;
  tax_amount: number;
  final_amount: number;
  coupon_code?: string;
  payment_method: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  is_dual_delivery: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  shipments?: Shipment[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  variant_details?: {
    [key: string]: string;
  };
  personalization_text?: string;
  assigned_address_id?: string;
  created_at: string;
}

export interface Shipment {
  id: string;
  order_id: string;
  shipment_number: string;
  address_id?: string;
  tracking_number?: string;
  carrier?: string;
  status: 'pending' | 'picked' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed';
  shipped_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  address?: Address;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  order_id?: string;
  rating: number;
  comment?: string;
  created_at: string;
  user?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount?: number;
  usage_limit?: number;
  used_count: number;
  valid_from: string;
  valid_until?: string;
  is_active: boolean;
  created_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  payment_method: string;
  transaction_id?: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_details?: {
    [key: string]: unknown;
  };
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: {
    [key: string]: string;
  };
  personalizationText?: string;
  assignedAddressId?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeUsers: number;
  pendingOrders: number;
  recentOrders: Order[];
  topProducts: Product[];
}
