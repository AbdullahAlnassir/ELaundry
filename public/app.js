const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Initialize Express app
const app = express();
const port = 3000;

// Configure PostgreSQL connection
const pool = new Pool({
    connectionString: 'postgres://admin:admin@localhost:5432/elaundry_db'
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from public directory
app.use(express.static('public'));

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password, email, fullName, phoneNumber, creditCardNumber } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (username, password, email, full_name, phone_number, credit_card_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [username, password, email, fullName, phoneNumber, creditCardNumber]);
        res.json({ success: true, userId: result.rows[0].user_id });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
});

// Fetch products endpoint
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
});

// Fetch user settings
app.get('/get-settings', async (req, res) => {
    const userId = 1; // Example user ID
    try {
        const result = await pool.query('SELECT receive_marketing_emails, notify_sale, auto_subscription FROM users WHERE user_id = $1', [userId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ error: 'Failed to retrieve settings' });
    }
});

// Update user settings
app.post('/update-settings', async (req, res) => {
    const { marketingEmails, saleNotifications, autoSubscription } = req.body;
    const userId = 1; // Example user ID
    try {
        await pool.query('UPDATE users SET receive_marketing_emails = $1, notify_sale = $2, auto_subscription = $3 WHERE user_id = $4', [marketingEmails, saleNotifications, autoSubscription, userId]);
        res.json({ success: true, message: 'Settings updated successfully!' });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

// Process payment endpoint
app.post('/process-payment', async (req, res) => {
    const { cardholder, cardNumber, expMonth, expYear, cvv } = req.body;
    try {
        // Here you would typically call a payment API or service
        console.log('Processing payment for:', cardNumber); // Log sensitive information for demonstration purposes only
        // Simulate payment success
        res.json({ success: true, message: 'Payment processed successfully!' });
    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({ error: 'Failed to process payment' });
    }
});

// Fetch all users endpoint
app.get('/customers', async (req, res) => {
    try {
        const result = await pool.query('SELECT full_name, email, username, phone_number, credit_card_number, password FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Failed to retrieve customers' });
    }
});

// Fetch wishlist items endpoint
app.get('/wishlist', async (req, res) => {
    const userId = 1; // Example user ID
    try {
        const result = await pool.query('SELECT p.name, p.price, w.quantity, w.product_id FROM wishlist w JOIN products p ON w.product_id = p.product_id WHERE w.user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        res.status(500).json({ error: 'Failed to fetch wishlist items' });
    }
});

// Add product to cart endpoint
app.post('/add-to-cart', async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const result = await pool.query('INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [user_id, product_id, quantity]);
        res.json({ success: true, cartItem: result.rows[0] });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add to cart' });
    }
});

// Fetch cart items endpoint
app.get('/cart', async (req, res) => {
    const { user_id } = req.query;
    try {
        const result = await pool.query('SELECT * FROM cart WHERE user_id = $1', [user_id]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
});

// Add to wishlist endpoint
app.post('/add-to-wishlist', async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        const result = await pool.query('INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) RETURNING *', [user_id, product_id]);
        res.json({ success: true, wishlistItem: result.rows[0] });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ error: 'Failed to add to wishlist' });
    }
});

// Fetch wishlist items endpoint
app.get('/wishlist', async (req, res) => {
    const { user_id } = req.query;
    try {
        const result = await pool.query('SELECT * FROM wishlist WHERE user_id = $1', [user_id]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        res.status(500).json({ error: 'Failed to fetch wishlist items' });
    }
});

// Place an order endpoint
app.post('/place-order', async (req, res) => {
    const { user_id, total_price } = req.body;
    try {
        const result = await pool.query('INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, \'pending\') RETURNING *', [user_id, total_price]);
        res.json({ success: true, order: result.rows[0] });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

// Save address details endpoint
app.post('/save-address', async (req, res) => {
    const { user_id, street, district, city, country, delivery_type, delivery_time, delivery_date } = req.body;
    try {
        const result = await pool.query('INSERT INTO addresses (user_id, street, district, city, country, delivery_type, delivery_time, delivery_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [user_id, street, district, city, country, delivery_type, delivery_time, delivery_date]);
        res.json({ success: true, address: result.rows[0] });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).json({ error: 'Failed to save address' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
