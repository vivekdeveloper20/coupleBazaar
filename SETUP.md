# Couple Bazzar E-Commerce Setup Guide

## Overview

Couple Bazzar is a fully functional couples e-commerce marketplace with a unique **Dual Delivery** feature that allows customers to send items to two different addresses in a single order.

## Features

- Modern romantic design with blush pink and rose gold theme
- Full authentication system with Supabase
- Product catalog with variants, personalization, and reviews
- Shopping cart with dual delivery support
- Checkout with multiple address management
- Order tracking and history
- Wishlist functionality
- Coupon system
- Admin dashboard
- Fully responsive design

## Setup Instructions

### 1. Configure Supabase

Update the `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

The database schema has already been applied with the migration. Your database includes:

- profiles
- categories
- products & product variants
- addresses
- orders & order items
- shipments
- reviews
- wishlist
- coupons
- payments

### 3. Add Sample Data

To get started, add some sample data to your database. You can use the Supabase SQL Editor to run these queries:

#### Add Categories

```sql
INSERT INTO categories (name, slug, description, image_url) VALUES
('Valentine''s Day', 'valentine', 'Romantic gifts for your special someone', 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg'),
('Anniversary', 'anniversary', 'Celebrate your love story', 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg'),
('Birthday', 'birthday', 'Make their day extra special', 'https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg'),
('Just Because', 'just-because', 'Surprise them any day', 'https://images.pexels.com/photos/2072179/pexels-photo-2072179.jpeg');
```

#### Add Sample Products

```sql
INSERT INTO products (name, slug, description, category_id, base_price, discount_percentage, final_price, stock_quantity, is_active, is_featured, occasion, allows_personalization, personalization_price) VALUES
('Love Letters Box Set', 'love-letters-box-set', 'A beautiful set of personalized love letters in an elegant box', (SELECT id FROM categories WHERE slug = 'valentine'), 49.99, 10, 44.99, 50, true, true, ARRAY['Valentine', 'Anniversary'], true, 5.00),
('Couples Photo Frame', 'couples-photo-frame', 'Elegant rose gold frame for your favorite memories', (SELECT id FROM categories WHERE slug = 'anniversary'), 34.99, 0, 34.99, 100, true, true, ARRAY['Anniversary', 'Valentine', 'Birthday'], true, 3.00),
('Matching Couple Bracelets', 'matching-couple-bracelets', 'Sterling silver bracelets with customizable engravings', (SELECT id FROM categories WHERE slug = 'just-because'), 89.99, 15, 76.49, 75, true, true, ARRAY['Valentine', 'Anniversary', 'Just Because'], true, 8.00),
('Luxury Chocolate Gift Box', 'luxury-chocolate-gift-box', 'Premium handcrafted chocolates in beautiful packaging', (SELECT id FROM categories WHERE slug = 'birthday'), 59.99, 0, 59.99, 30, true, true, ARRAY['Birthday', 'Valentine', 'Anniversary'], false, 0),
('Personalized Star Map', 'personalized-star-map', 'Custom star map of your special date', (SELECT id FROM categories WHERE slug = 'anniversary'), 79.99, 20, 63.99, 40, true, true, ARRAY['Anniversary', 'Valentine'], true, 10.00),
('Couple''s Spa Gift Set', 'couples-spa-gift-set', 'Relaxing spa products for two', (SELECT id FROM categories WHERE slug = 'just-because'), 44.99, 0, 44.99, 60, true, true, ARRAY['Birthday', 'Just Because'], false, 0);
```

#### Add Product Images

```sql
INSERT INTO product_images (product_id, image_url, display_order) VALUES
((SELECT id FROM products WHERE slug = 'love-letters-box-set'), 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg', 0),
((SELECT id FROM products WHERE slug = 'couples-photo-frame'), 'https://images.pexels.com/photos/1030945/pexels-photo-1030945.jpeg', 0),
((SELECT id FROM products WHERE slug = 'matching-couple-bracelets'), 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg', 0),
((SELECT id FROM products WHERE slug = 'luxury-chocolate-gift-box'), 'https://images.pexels.com/photos/3776942/pexels-photo-3776942.jpeg', 0),
((SELECT id FROM products WHERE slug = 'personalized-star-map'), 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg', 0),
((SELECT id FROM products WHERE slug = 'couples-spa-gift-set'), 'https://images.pexels.com/photos/3738388/pexels-photo-3738388.jpeg', 0);
```

#### Add Sample Coupons

```sql
INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount, usage_limit, valid_from, valid_until, is_active) VALUES
('LOVE2026', 'percentage', 15, 50, 20, 100, now(), now() + interval '30 days', true),
('WELCOME10', 'percentage', 10, 30, 15, 200, now(), now() + interval '60 days', true),
('FREESHIP', 'fixed', 10, 0, 10, 500, now(), now() + interval '90 days', true);
```

#### Create Admin User

After signing up normally, update your profile to admin:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

### 4. Run the Application

```bash
npm install
npm run dev
```

## Key Features Guide

### Dual Delivery Feature

1. Add items to cart
2. Go to checkout
3. Enable "Dual Delivery" option
4. Select two different addresses
5. Assign each product to an address
6. Complete payment
7. Track both shipments separately

### Admin Dashboard

Access the admin dashboard at `/admin` (requires admin role):
- View revenue and order statistics
- Monitor pending orders
- See top products
- Manage all aspects via Supabase dashboard

### Product Management

Products support:
- Multiple images
- Variants (size, color, etc.)
- Personalization options
- Stock management
- Ratings and reviews
- Occasion tagging

### Order Flow

1. Browse products
2. Add to cart (with variants/personalization)
3. Checkout (select delivery addresses)
4. Payment (online or COD)
5. Track order status
6. Leave reviews

## Technology Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (Database + Auth)
- Lucide React (Icons)

## Notes

- All products use stock photos from Pexels
- Payment integration is simulated (can be connected to Stripe)
- Email notifications can be added via Supabase Edge Functions
- Images are linked, not downloaded

## Support

For any issues or questions, check the database structure in Supabase or review the component files in the `src` directory.
