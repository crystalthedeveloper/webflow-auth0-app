const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
import('node-fetch').then(fetch => {
  // Now you can use fetch here
}).catch(err => {
  console.error('Failed to import node-fetch:', err);
});

dotenv.config();

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://firststep-46e83b.webflow.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Handle preflight requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://firststep-46e83b.webflow.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

// Body parsing middleware
app.use(express.json());

// DELETE route for deleting user by email
app.delete('/api/deleteUser', async (req, res) => {
  const { email } = req.body;

  // Add your logic here to handle the deletion of the user by email
  // For example, you can delete the user from the database or make additional requests to external APIs
  // Handle errors and send appropriate responses
  try {
    // Delete user logic here
    res.status(200).json({ message: `User with email ${email} deleted successfully` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Proxy middleware options
const options = {
  target: 'https://api.webflow.com', // target host
  changeOrigin: true,                // needed for virtual hosted sites
  pathRewrite: {
    '^/api': '',                     // remove base path
  },
  onProxyReq: (proxyReq, req, res) => {
    // Debug: Log the target and headers to verify
    console.log(`Proxying request to: ${options.target}`);
    console.log('Request headers:', req.headers);
    proxyReq.setHeader('Authorization', `Bearer ${process.env.WEBFLOW_API_TOKEN}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    // Debug: Log the response headers
    console.log('Response headers:', proxyRes.headers);
  }
};

// Debug: Log the entire options object
console.log('Proxy options:', options);

// Create the proxy
const apiProxy = createProxyMiddleware(options);

// Use the proxy middleware
app.use('/api', apiProxy);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
