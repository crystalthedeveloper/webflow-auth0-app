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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Handle preflight requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://firststep-46e83b.webflow.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

// Body parsing middleware
app.use(express.json());

// PUT route for updating user quiz completion count
app.put('/api/updateQuizCompletionCount', async (req, res) => {
  const { email, newCount } = req.body;

  // Add your logic here to update the user's quiz completion count
  try {
    const response = await fetch(`https://api.webflow.com/users/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
      },
      body: JSON.stringify({ 'quiz-completion-count': newCount }), // Update the quiz completion count
    });

    const json = await response.json();

    if (response.ok) {
      res.status(200).json({ message: `Quiz completion count updated for user with email ${email}`, data: json });
    } else {
      res.status(400).json({ error: 'Failed to update quiz completion count for user', data: json });
    }
  } catch (error) {
    console.error('Error updating quiz completion count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Proxy middleware options
const options = {
  target: 'https://api.webflow.com', // target host
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/api': '', // remove base path
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
  },
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
