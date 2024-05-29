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

  // Your function logic
  if (req.method === 'DELETE') {
    // Your route handler
    // Retrieve environment variables
    const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
    const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;

    const { userId } = req.query;
    const { idToken } = req.body;

    // Check if both user ID and ID token are provided
    if (!userId || !idToken) {
      return res.status(400).json({ error: 'User ID and ID token are required' });
    }

    try {
      // Verify Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid; // Extract user ID from decoded token

      // Check if the authenticated user matches the requested user ID
      if (uid !== userId) {
        return res.status(403).json({ error: 'Unauthorized access' }); // Return 403 Forbidden if unauthorized
      }

      // Proceed with deleting the Webflow user account
      const url = `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}/users/${userId}`; // Webflow API endpoint
      const options = {
        method: 'DELETE', // HTTP DELETE method
        headers: {
          'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`, // Authorization header with Webflow API token
          'Accept': 'application/json' // Accept JSON response
        }
      };

      const response = await fetch(url, options); // Send DELETE request to Webflow API

      // Check for network errors
      if (!response.ok) {
        const errorData = await response.json(); // Extract error data from response
        return res.status(response.status).json({ error: errorData }); // Return error response
      }

      const json = await response.json(); // Parse JSON response
      return res.json({ success: true, data: json }); // Return success response with data
    } catch (error) {
      console.error('Error deleting Webflow user account:', error);
      // Handle other potential errors
      return res.status(500).json({ error: 'Internal Server Error' }); // Return 500 Internal Server Error response
    }
  }

  // Handle other HTTP methods
  res.status(404).send('Not Found');
};
