-- Create Customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    country VARCHAR(50) NOT NULL,
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL
);

-- Create Order Items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL
);

-- Insert Sample Data

-- Customers
INSERT INTO customers (name, email, country, signup_date) VALUES
('Juan Perez', 'juan.perez@example.com', 'Argentina', '2023-01-15 10:00:00'),
('Maria Garcia', 'maria.garcia@example.com', 'Spain', '2023-02-20 11:30:00'),
('John Smith', 'john.smith@example.com', 'USA', '2023-03-05 09:15:00'),
('Alice Johnson', 'alice.j@example.com', 'Canada', '2023-03-10 14:00:00'),
('Robert Brown', 'robert.b@example.com', 'UK', '2023-04-12 16:45:00'),
('Emma Wilson', 'emma.w@example.com', 'Australia', '2023-05-18 12:00:00'),
('Michael Davis', 'michael.d@example.com', 'USA', '2023-06-22 08:30:00'),
('Lucia Rossi', 'lucia.r@example.com', 'Italy', '2023-07-30 15:20:00'),
('Hans Müller', 'hans.m@example.com', 'Germany', '2023-08-14 10:10:00'),
('Sophie Petit', 'sophie.p@example.com', 'France', '2023-09-01 17:05:00');

-- Products
INSERT INTO products (name, category, price) VALUES
('Laptop Pro 14', 'Electronics', 1200.00),
('Smartphone X', 'Electronics', 800.00),
('Wireless Headphones', 'Electronics', 150.00),
('Coffee Maker', 'Home', 80.00),
('Desk Chair', 'Furniture', 250.00),
('Running Shoes', 'Sports', 120.00),
('Smart Watch', 'Electronics', 300.00),
('Backpack', 'Accessories', 60.00),
('Bluetooth Speaker', 'Electronics', 100.00),
('Mechanical Keyboard', 'Electronics', 130.00);

-- Orders
INSERT INTO orders (customer_id, order_date, status) VALUES
(1, '2024-01-10 10:00:00', 'completed'),
(2, '2024-01-15 14:30:00', 'completed'),
(3, '2024-02-01 09:15:00', 'shipped'),
(1, '2024-02-10 11:00:00', 'completed'),
(4, '2024-03-05 16:45:00', 'pending'),
(5, '2024-03-12 10:20:00', 'completed'),
(6, '2024-04-01 12:00:00', 'shipped'),
(2, '2024-04-15 15:30:00', 'completed'),
(7, '2024-05-02 08:45:00', 'completed'),
(8, '2024-05-10 14:00:00', 'pending');

-- Order Items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1200.00),
(1, 3, 2, 150.00),
(2, 2, 1, 800.00),
(3, 4, 1, 80.00),
(4, 5, 1, 250.00),
(4, 10, 1, 130.00),
(5, 6, 2, 120.00),
(6, 7, 1, 300.00),
(7, 8, 1, 60.00),
(8, 2, 1, 800.00),
(9, 1, 1, 1200.00),
(10, 9, 2, 100.00);
