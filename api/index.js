// api/index.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;

app.post('/delete-webflow-account', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const url = `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}/users/${userId}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'Accept': 'application/json'
      }
    };

    const response = await fetch(url, options);
    const json = await response.json();

    if (response.ok) {
      res.json({ success: true, data: json });
    } else {
      res.status(response.status).json({ error: json });
    }
  } catch (error) {
    console.error('Error deleting Webflow user account:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
