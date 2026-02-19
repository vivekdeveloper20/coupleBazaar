-- Insert sample categories
INSERT INTO categories (id, name, slug, description, image_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Jewelry', 'jewelry', 'Beautiful jewelry for your loved one', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500'),
  ('22222222-2222-2222-2222-222222222222', 'Flowers', 'flowers', 'Fresh and beautiful flowers', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500'),
  ('33333333-3333-3333-3333-333333333333', 'Chocolates', 'chocolates', 'Delicious chocolates and sweets', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500'),
  ('44444444-4444-4444-4444-444444444444', 'Personalized Gifts', 'personalized', 'Custom gifts with personal touch', 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500'),
  ('55555555-5555-5555-5555-555555555555', 'Experience Gifts', 'experiences', 'Memorable experiences together', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (id, name, slug, description, category_id, base_price, discount_percentage, final_price, stock_quantity, is_active, is_featured, occasion, allows_personalization, rating_average, rating_count) VALUES
  -- Valentine Products
  ('aaaa1111-1111-1111-1111-111111111111', 'Heart Pendant Necklace', 'heart-pendant-necklace', 'Beautiful rose gold heart pendant necklace, perfect for expressing your love. Made with high-quality materials.', '11111111-1111-1111-1111-111111111111', 89.99, 10, 80.99, 50, true, true, ARRAY['Valentine', 'Anniversary'], false, 4.8, 124),
  ('aaaa2222-2222-2222-2222-222222222222', 'Red Rose Bouquet', 'red-rose-bouquet', 'Stunning bouquet of 24 fresh red roses, symbolizing deep love and passion.', '22222222-2222-2222-2222-222222222222', 59.99, 0, 59.99, 100, true, true, ARRAY['Valentine', 'Anniversary', 'Just Because'], false, 4.9, 256),
  ('aaaa3333-3333-3333-3333-333333333333', 'Luxury Chocolate Box', 'luxury-chocolate-box', 'Premium Belgian chocolates in a beautiful heart-shaped box. 24 assorted pieces.', '33333333-3333-3333-3333-333333333333', 49.99, 15, 42.49, 75, true, true, ARRAY['Valentine', 'Birthday', 'Just Because'], false, 4.7, 89),
  ('aaaa4444-4444-4444-4444-444444444444', 'Couple Photo Frame', 'couple-photo-frame', 'Personalized wooden photo frame with custom engraving. Perfect for capturing your favorite memories.', '44444444-4444-4444-4444-444444444444', 39.99, 0, 39.99, 200, true, false, ARRAY['Valentine', 'Anniversary', 'Wedding'], true, 4.6, 67),
  ('aaaa5555-5555-5555-5555-555555555555', 'Spa Day for Two', 'spa-day-for-two', 'Relaxing couples spa experience including massage, facial, and aromatherapy session.', '55555555-5555-5555-5555-555555555555', 199.99, 20, 159.99, 30, true, true, ARRAY['Valentine', 'Anniversary'], false, 4.9, 45),
  
  -- Anniversary Products
  ('bbbb1111-1111-1111-1111-111111111111', 'Diamond Stud Earrings', 'diamond-stud-earrings', 'Elegant 0.5 carat diamond stud earrings in 14k white gold setting.', '11111111-1111-1111-1111-111111111111', 499.99, 10, 449.99, 25, true, true, ARRAY['Anniversary', 'Wedding'], false, 4.9, 78),
  ('bbbb2222-2222-2222-2222-222222222222', 'Mixed Flower Arrangement', 'mixed-flower-arrangement', 'Beautiful arrangement of roses, lilies, and orchids in an elegant vase.', '22222222-2222-2222-2222-222222222222', 79.99, 0, 79.99, 60, true, false, ARRAY['Anniversary', 'Birthday', 'Just Because'], false, 4.7, 134),
  ('bbbb3333-3333-3333-3333-333333333333', 'Artisan Truffle Collection', 'artisan-truffle-collection', 'Hand-crafted truffles in various flavors - dark chocolate, champagne, and raspberry.', '33333333-3333-3333-3333-333333333333', 69.99, 0, 69.99, 40, true, false, ARRAY['Anniversary', 'Valentine'], false, 4.8, 56),
  ('bbbb4444-4444-4444-4444-444444444444', 'Custom Star Map', 'custom-star-map', 'Personalized star map showing the night sky from any special date and location.', '44444444-4444-4444-4444-444444444444', 59.99, 0, 59.99, 150, true, true, ARRAY['Anniversary', 'Wedding', 'Birthday'], true, 4.8, 189),
  ('bbbb5555-5555-5555-5555-555555555555', 'Romantic Dinner Cruise', 'romantic-dinner-cruise', 'Private dinner cruise for two with gourmet meal and stunning city views.', '55555555-5555-5555-5555-555555555555', 299.99, 15, 254.99, 20, true, true, ARRAY['Anniversary', 'Valentine'], false, 4.9, 34),
  
  -- Birthday Products
  ('cccc1111-1111-1111-1111-111111111111', 'Birthstone Bracelet', 'birthstone-bracelet', 'Delicate sterling silver bracelet featuring your birthstone gem.', '11111111-1111-1111-1111-111111111111', 69.99, 0, 69.99, 80, true, false, ARRAY['Birthday', 'Just Because'], false, 4.6, 92),
  ('cccc2222-2222-2222-2222-222222222222', 'Birthday Flower Basket', 'birthday-flower-basket', 'Colorful flower basket with sunflowers, daisies, and carnations.', '22222222-2222-2222-2222-222222222222', 54.99, 10, 49.49, 70, true, false, ARRAY['Birthday', 'Just Because'], false, 4.7, 167),
  ('cccc3333-3333-3333-3333-333333333333', 'Gourmet Cookie Box', 'gourmet-cookie-box', 'Assorted gourmet cookies - chocolate chip, red velvet, and macadamia nut.', '33333333-3333-3333-3333-333333333333', 34.99, 0, 34.99, 100, true, false, ARRAY['Birthday', 'Just Because'], false, 4.5, 78),
  ('cccc4444-4444-4444-4444-444444444444', 'Personalized Music Box', 'personalized-music-box', 'Beautiful wooden music box that plays a melody of your choice with custom engraving.', '44444444-4444-4444-4444-444444444444', 79.99, 0, 79.99, 45, true, true, ARRAY['Birthday', 'Anniversary', 'Wedding'], true, 4.8, 56),
  ('cccc5555-5555-5555-5555-555555555555', 'Cooking Class for Two', 'cooking-class-for-two', 'Learn to cook a gourmet meal together with a professional chef.', '55555555-5555-5555-5555-555555555555', 149.99, 0, 149.99, 40, true, false, ARRAY['Birthday', 'Anniversary'], false, 4.7, 89),
  
  -- Just Because Products
  ('dddd1111-1111-1111-1111-111111111111', 'Infinity Ring', 'infinity-ring', 'Sterling silver infinity ring symbolizing eternal love.', '11111111-1111-1111-1111-111111111111', 49.99, 0, 49.99, 120, true, false, ARRAY['Just Because', 'Valentine', 'Anniversary'], false, 4.7, 145),
  ('dddd2222-2222-2222-2222-222222222222', 'Succulent Garden', 'succulent-garden', 'Beautiful arrangement of assorted succulents in a decorative pot.', '22222222-2222-2222-2222-222222222222', 44.99, 0, 44.99, 55, true, false, ARRAY['Just Because', 'Birthday'], false, 4.6, 67),
  ('dddd3333-3333-3333-3333-333333333333', 'Hot Chocolate Gift Set', 'hot-chocolate-gift-set', 'Premium hot chocolate mix with marshmallows and two matching mugs.', '33333333-3333-3333-3333-333333333333', 29.99, 0, 29.99, 90, true, false, ARRAY['Just Because', 'Birthday'], false, 4.5, 112),
  ('dddd4444-4444-4444-4444-444444444444', 'Love Letter Kit', 'love-letter-kit', 'Vintage-style stationery set with wax seal for writing romantic letters.', '44444444-4444-4444-4444-444444444444', 24.99, 0, 24.99, 200, true, false, ARRAY['Just Because', 'Valentine', 'Anniversary'], true, 4.4, 89),
  ('dddd5555-5555-5555-5555-555555555555', 'Movie Night Package', 'movie-night-package', 'Cozy blanket, popcorn, chocolates, and streaming gift card for the perfect movie night.', '55555555-5555-5555-5555-555555555555', 69.99, 10, 62.99, 65, true, false, ARRAY['Just Because', 'Birthday'], false, 4.6, 134),
  
  -- Wedding Products
  ('eeee1111-1111-1111-1111-111111111111', 'Wedding Band Set', 'wedding-band-set', 'Matching platinum wedding bands with subtle diamond accents.', '11111111-1111-1111-1111-111111111111', 899.99, 5, 854.99, 15, true, true, ARRAY['Wedding'], false, 4.9, 23),
  ('eeee2222-2222-2222-2222-222222222222', 'Bridal Bouquet', 'bridal-bouquet', 'Elegant bridal bouquet with white roses, peonies, and baby breath.', '22222222-2222-2222-2222-222222222222', 129.99, 0, 129.99, 30, true, true, ARRAY['Wedding'], false, 4.9, 45),
  ('eeee3333-3333-3333-3333-333333333333', 'Wedding Cake Chocolates', 'wedding-cake-chocolates', 'Exquisite wedding cake flavored Belgian chocolates in elegant packaging.', '33333333-3333-3333-3333-333333333333', 89.99, 0, 89.99, 35, true, false, ARRAY['Wedding', 'Anniversary'], false, 4.7, 28),
  ('eeee4444-4444-4444-4444-444444444444', 'Mr & Mrs Sign', 'mr-mrs-sign', 'Custom wooden Mr & Mrs sign with your wedding date, perfect for home decor.', '44444444-4444-4444-4444-444444444444', 49.99, 0, 49.99, 100, true, true, ARRAY['Wedding', 'Anniversary'], true, 4.8, 167),
  ('eeee5555-5555-5555-5555-555555555555', 'Honeymoon Getaway', 'honeymoon-getaway', '3-night romantic honeymoon package at a luxury resort.', '55555555-5555-5555-5555-555555555555', 999.99, 10, 899.99, 10, true, true, ARRAY['Wedding'], false, 5.0, 12)
ON CONFLICT (slug) DO NOTHING;

-- Insert product images
INSERT INTO product_images (product_id, image_url, display_order) VALUES
  -- Valentine Products
  ('aaaa1111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500', 1),
  ('aaaa2222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=500', 1),
  ('aaaa3333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500', 1),
  ('aaaa4444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500', 1),
  ('aaaa5555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500', 1),
  
  -- Anniversary Products
  ('bbbb1111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500', 1),
  ('bbbb2222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500', 1),
  ('bbbb3333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500', 1),
  ('bbbb4444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500', 1),
  ('bbbb5555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500', 1),
  
  -- Birthday Products
  ('cccc1111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500', 1),
  ('cccc2222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500', 1),
  ('cccc3333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500', 1),
  ('cccc4444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', 1),
  ('cccc5555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500', 1),
  
  -- Just Because Products
  ('dddd1111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500', 1),
  ('dddd2222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500', 1),
  ('dddd3333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500', 1),
  ('dddd4444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1579965342575-16428a7c8881?w=500', 1),
  ('dddd5555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500', 1),
  
  -- Wedding Products
  ('eeee1111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500', 1),
  ('eeee2222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1522057306606-8d84dca13fcf?w=500', 1),
  ('eeee3333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=500', 1),
  ('eeee4444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500', 1),
  ('eeee5555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500', 1);
