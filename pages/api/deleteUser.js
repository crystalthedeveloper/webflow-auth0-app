const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

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
