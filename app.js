// Import required modules
import express from 'express'; // Express.js framework
import bodyParser from 'body-parser'; // Middleware for parsing request bodies
import fetch from 'node-fetch'; // Library for making HTTP requests
import dotenv from 'dotenv'; // Module for loading environment variables
import admin from 'firebase-admin'; // Firebase Admin SDK for authentication
import cors from 'cors'; // Middleware for enabling CORS

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();
app.use(bodyParser.json()); // Use JSON body parser middleware

// Enable CORS for all routes
const corsOptions = {
  origin: 'https://firststep-46e83b.webflow.io', // Replace with your specific origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// OR for more granular control, apply it to specific routes:
app.options('/users/:userId', cors(corsOptions)); // Preflight requests for DELETE route
app.delete('/users/:userId', cors(corsOptions), async (req, res) => {
  // Your route handler
});

// Retrieve environment variables
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID, // Firebase project ID
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // Firebase service account email
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') // Firebase service account private key
  })
});

// Define route for deleting Webflow user account using RESTful convention
app.delete('/users/:userId', async (req, res) => {
  // Extract user ID from URL parameters and Firebase ID token from request body
  const { userId } = req.params;
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
    res.json({ success: true, data: json }); // Return success response with data
  } catch (error) {
    console.error('Error deleting Webflow user account:', error);
    // Handle other potential errors
    res.status(500).json({ error: 'Internal Server Error' }); // Return 500 Internal Server Error response
  }
});

// Export the Express app as the default module
export default app;
