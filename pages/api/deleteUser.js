// pages/api/deleteUser.js

import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

const auth = getAuth(app);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://firststep-46e83b.webflow.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'DELETE') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const user = await auth.getUserByEmail(email);
      await auth.deleteUser(user.uid);

      const url = `https://api.webflow.com/v2/sites/${process.env.WEBFLOW_SITE_ID}/users/${user.uid}`;
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
          'Accept': 'application/json'
        }
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData });
      }

      const json = await response.json();
      return res.json({ success: true, data: json });
    } catch (error) {
      console.error('Error deleting user accounts:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(404).send('Not Found');
}
