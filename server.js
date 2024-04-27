require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const helmet = require('helmet'); // Security middleware
const morgan = require('morgan'); // HTTP request logger middleware

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL pool configuration using environment variables
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgres://postgres:admin@localhost:5432/elaundry_db`
});

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(helmet()); // Enhance security with Helmet
app.use(morgan('tiny')); // Enable HTTP request logging for better debugging

// Registration endpoint
app.post('/register', async (req, res) => {
    // Your existing registration logic...
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM customers WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Authentication successful
        res.json({ message: "Login successful" });
    } catch (err) {
        console.error('Error executing login query', err.stack);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
