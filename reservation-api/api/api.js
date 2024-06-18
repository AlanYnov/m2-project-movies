const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Middleware imports
const limiter = require('./middlewares/rate-limit');

const app = express();

// Enable CORS with environment variable for the origin
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Body parser middleware to handle JSON payloads
app.use(bodyParser.json({ limit: '50mb' }));

// Rate Limiting for API requests
app.use(limiter);

// Security headers with Helmet
app.use(helmet());

// Dynamically load and use route files
const routesPath = path.join(__dirname, './routes');
fs.readdirSync(routesPath).forEach(file => {
    if (file.endsWith('.js')) {
        const route = require(`./routes/${file}`);
        app.use('/api-reservation', route);
    }
});

module.exports = app;