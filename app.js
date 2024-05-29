import('node-fetch').then(fetch => {
  // Now you can use fetch here
}).catch(err => {
  console.error('Failed to import node-fetch:', err);
});
const dotenv = require('dotenv');
const admin = require('firebase-admin');

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID, // Firebase project ID
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // Firebase service account email
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') // Firebase service account private key
  })
});

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://firststep-46e83b.webflow.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    return res.status(200).end();
  }

  // Your function logic
  if (req.method === 'DELETE') {
    // Retrieve environment variables
    const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
    const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;

    const { email } = req.body;  // Expect email in the request body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      // Delete user from Firebase
      const user = await admin.auth().getUserByEmail(email);
      await admin.auth().deleteUser(user.uid);

      // Delete user from Webflow
      const url = `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}/users/${user.uid}`; // Webflow API endpoint
      const options = {
        method: 'DELETE', // HTTP DELETE method
        headers: {
          'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`, // Authorization header with Webflow API token
          'Accept': 'application/json' // Accept JSON response
        }
      };

      const response = await fetch(url, options); // Send DELETE request to Webflow API

      if (!response.ok) {
        const errorData = await response.json(); // Extract error data from response
        return res.status(response.status).json({ error: errorData }); // Return error response
      }

      const json = await response.json(); // Parse JSON response
      return res.json({ success: true, data: json }); // Return success response with data
    } catch (error) {
      console.error('Error deleting user accounts:', error);
      // Handle other potential errors
      return res.status(500).json({ error: 'Internal Server Error' }); // Return 500 Internal Server Error response
    }
  }

  // Handle other HTTP methods
  res.status(404).send('Not Found');
};