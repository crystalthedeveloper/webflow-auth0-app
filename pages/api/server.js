const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const cors = require('cors');
import('node-fetch').then(fetch => {
  // Now you can use fetch here
}).catch(err => {
  console.error('Failed to import node-fetch:', err);
});

dotenv.config();

const app = express();

// CORS middleware
app.use(cors({
  origin: 'https://firststep-46e83b.webflow.io', // Allow only the Webflow origin
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Handle preflight requests
app.options('*', cors());

// Body parsing middleware
app.use(express.json());

// Function to add user to Webflow CMS collection
async function addMemberToCMS(email) {
  try {
    const url = `https://api.webflow.com/v2/collections/${process.env.WEBFLOW_COLLECTION_ID}/items`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WEBFLOW_API_TOKEN}`
      },
      body: JSON.stringify({
        fields: {
          email: email
        }
      })
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log('User added to CMS collection:', data);
  } catch (error) {
    console.error('Error adding user to CMS collection:', error);
  }
}

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await addMemberToCMS(email); // Add user to membership CMS collection
    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Sign-up error:', error.message);
    res.status(500).json({ error: 'Error signing up' });
  }
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
