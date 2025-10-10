export const mockCustomers = [
  { id: 1, name: 'John Doe', email: 'john.doe@email.com', address: '1 Infinite Loop, Cupertino, CA', city: 'Cupertino', status: 'Active', orders: 3, phone: '+1 (555) 123-4567', joined: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', address: '221B Baker Street, London', city: 'London', status: 'Active', orders: 2, phone: '+44 20 7946 0958', joined: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@email.com', address: '4 Privet Drive, Little Whinging', city: 'Surrey', status: 'Active', orders: 1, phone: '+44 1753 123456', joined: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@email.com', address: '1640 Riverside Drive, Hill Valley', city: 'Hill Valley', status: 'Active', orders: 2, phone: '+1 (555) 234-5678', joined: '2023-04-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@email.com', address: '742 Evergreen Terrace, Springfield', city: 'Springfield', status: 'Active', orders: 1, phone: '+1 (555) 345-6789', joined: '2023-05-12' },
];

export const mockProducts = [
  { id: 1, name: 'MacBook Pro 16" M3 Max', category: 'Laptops', price: 3499.00, stock: 15, status: 'In Stock', sku: 'MBP-M3-16-MAX', description: 'Apple MacBook Pro with M3 Max chip, 16-inch Liquid Retina XDR display, 36GB unified memory, 1TB SSD storage' },
  { id: 2, name: 'Lily58 Pro Keyboard Kit', category: 'Keyboards', price: 149.50, stock: 8, status: 'In Stock', sku: 'L58-PRO-KIT', description: 'Split ergonomic mechanical keyboard kit with hot-swappable switches and RGB lighting' },
  { id: 3, name: 'Samsung Odyssey G9 49" Ultrawide', category: 'Monitors', price: 1299.99, stock: 3, status: 'Low Stock', sku: 'SAM-G9-49-UW', description: '49-inch curved gaming monitor with 240Hz refresh rate, 1ms response time, and HDR1000' },
  { id: 4, name: 'iPhone 15 Pro Max 1TB', category: 'Phones', price: 1599.00, stock: 25, status: 'In Stock', sku: 'IPH-15-PM-1TB', description: 'iPhone 15 Pro Max with A17 Pro chip, titanium design, 48MP camera system, and 1TB storage' },
  { id: 5, name: 'AirPods Pro 2nd Gen', category: 'Audio', price: 249.00, stock: 50, status: 'In Stock', sku: 'APP-2ND-GEN', description: 'Active noise cancellation, spatial audio, and up to 6 hours of listening time' },
];

export const mockOrders = [
  { id: 1, customer: 'John Doe', product: 'MacBook Pro 16" M3 Max', amount: 3499.00, status: 'Completed', date: '2024-01-15', email: 'john.doe@email.com', address: '123 Main St, New York, NY 10001' },
  { id: 2, customer: 'Jane Smith', product: 'Lily58 Pro Keyboard Kit', amount: 149.50, status: 'Pending', date: '2024-01-14', email: 'jane.smith@email.com', address: '456 Oak Ave, Los Angeles, CA 90210' },
  { id: 3, customer: 'Bob Johnson', product: 'Samsung Odyssey G9 49" Ultrawide', amount: 1299.99, status: 'Shipped', date: '2024-01-13', email: 'bob.johnson@email.com', address: '789 Pine Rd, Chicago, IL 60601' },
  { id: 4, customer: 'Alice Brown', product: 'iPhone 15 Pro Max 1TB', amount: 1599.00, status: 'Completed', date: '2024-01-12', email: 'alice.brown@email.com', address: '321 Elm St, Miami, FL 33101' },
  { id: 5, customer: 'Charlie Wilson', product: 'AirPods Pro 2nd Gen', amount: 249.00, status: 'Shipped', date: '2024-01-11', email: 'charlie.wilson@email.com', address: '654 Maple Dr, Seattle, WA 98101' },
];