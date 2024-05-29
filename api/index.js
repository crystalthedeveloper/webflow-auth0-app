require("node-fetch");
var $43HA1$dotenv = require("dotenv");
var $43HA1$firebaseadmin = require("firebase-admin");


$84a264530b3fb4fb$importAsync$49b16c36adcf4377.then((fetch1)=>{
// Now you can use fetch here
}).catch((err)=>{
    console.error("Failed to import node-fetch:", err);
});


// Load environment variables from .env file
$43HA1$dotenv.config();
// Initialize Firebase Admin SDK with service account credentials
$43HA1$firebaseadmin.initializeApp({
    credential: $43HA1$firebaseadmin.credential.cert({
        projectId: "fir-authentication-app-89830",
        clientEmail: "firebase-adminsdk-bg3et@fir-authentication-app-89830.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCwf8fA3OegBuQh\nvrzL/CiUftwjNUKEwXFoAMkr+DcU6w6uzIzeF5M3x9ZxtrGL/UgX8cHM3Fx496H7\nMcpxpEvgto1e0LI4rk2f+r9FK5MnpsB+eZvDnBr2Og0uxPUZDYpNmZkUErDePfmQ\nvLSMQzT3jsRAIihAA5wDS6CT0+uRlBqvD0STkZpkuTRuPFU9Bi4aQOBghNodglqT\nQxN5B776j8ODIB8zjPdK2GOCraqXZ2OehpUVZkckmDw6ObWCeJPDzZVYfpqbZU5j\nhZIq/h/D7DwQnEr/UNNKM4B75BeZEr9ISZb5TYa2sJFE1maD4Ns5t3mfI7Kc0ApO\nLfiyNhC9AgMBAAECggEADkG4EyxU2mCMH2yuh+Sdq4cGxaJI9fvBKxc7KL3TRzGI\nfVag/1SUq/IMsKFC/K2QG/0HfEKFhrDsCOQX9+9/QI7GYxUE/F6Z/xTsS8xOBesq\ni9zLV/TdWavNQkyfBq/JDuUcEBrFZiJH7SjNBbJtDh0eXZbUvPz9pmd+uEorMlZL\ncFqAwHOriqIT09hXfJ+cd7FdPsiNRmzjit1jOMkVLr6rNb8NIthrM8MGBjhEx1Ju\nXVeRSkey0oSH+EICdC9EoFmIMoEFot2C83e0gzzvvLwruw40ArvmthCv2hOJ0s8K\nsGCVEwOcp1yHmnJcN3iCrycNukHD+6NSv5rhCS2msQKBgQDvIDa5CbwIiAaAs42O\nXEZnJ39wIrds/2kcAb+iTXc82FBMM3g+d10Ta2pp+VwVu8pycTakn1h2ZDzwLKCO\nGeJEiRT/ht/WfeEQtoWvFjG8xvrgwLRT/vJpZ0aC0Fod6xSdWmSzb7f/xGpzFxQb\nngFg5cID/EkOOWEvEqJ7q5ASjQKBgQC89DiXxoEZYqiY0jzHYysa+CGwEWs02mNh\nU4I0aTH+DLxCKB8vXA8ZuUmks/5LoEEiwX/VGO1l3iQGANtPj6yyXAVEonKSQ0Do\n9sy/mcOAfaR0oRFSE4849f8FTE0oH6q2qTkxXc9txt//ZkGKiMuVLvcALndyR/l7\nke6RqQ2C8QKBgD1u9EAjnRhAAhOsjXCGilvUDOx9Lsyk7ZcRZ+9FoZ2TIUYCbyD1\nP4dOsF8bfinjPgaayWQPwAViiTlW7cS0J6pd4XQobXdIjbrieYPa2tpZ8HgvaeSu\neg7URowzBQPssjYe1AI5cHcYOhTpV/Qkasw/GtI1TXuHCE20puPI1tG9AoGBAKTs\nPSEsX646kJGinu4hPpRxk2XMLliZbTib3P/F+Z6WmxLbVizOG1gGg6LAf+qeW3vs\njJkBAuRw+dxLjyBodQHQk8COUZYcIWG1WIy7twpFn+80Tpvm+pFrFUYYjRfCXAzG\ns2bFTLGybfzL0dULBTaXIXwFEriq3bTfcO2uMl7hAoGBAKdyYGmVlPAMA+nelz5O\nT1O5X1THBp6VPwBTKLD3Pg1jDHTjh1G6rebvv5CHxHcKDL3k4Qe+POPocVrFBt2F\n/rAzM30oZ/Vp9nGvwKMN/r5DMbQd9+upnjTRJ8VTr9Q4iiss75IMG2pe5BsQ8UIu\njYV2d3F4PscC3hu+qwzE83I9\n-----END PRIVATE KEY-----\n".replace(/\\n/g, "\n") // Firebase service account private key
    })
});
module.exports = async (req, res)=>{
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "https://firststep-46e83b.webflow.io");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") // Handle preflight requests
    return res.status(200).end();
    // Your function logic
    if (req.method === "DELETE") {
        // Retrieve environment variables
        const WEBFLOW_API_TOKEN = "327ee845b726bd57582609e4e09f49ebf127a13505929147b8791fd7eac3d451";
        const WEBFLOW_SITE_ID = "65f0d5739b651eae06b2ca56";
        const { userId: userId } = req.query;
        const { idToken: idToken } = req.body;
        // Check if both user ID and ID token are provided
        if (!userId || !idToken) return res.status(400).json({
            error: "User ID and ID token are required"
        });
        try {
            // Verify Firebase ID token
            const decodedToken = await $43HA1$firebaseadmin.auth().verifyIdToken(idToken);
            const uid = decodedToken.uid; // Extract user ID from decoded token
            // Check if the authenticated user matches the requested user ID
            if (uid !== userId) return res.status(403).json({
                error: "Unauthorized access"
            }); // Return 403 Forbidden if unauthorized
            // Delete user from Firebase
            await $43HA1$firebaseadmin.auth().deleteUser(userId);
            // Delete user from Webflow
            const url = `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}/users/${userId}`; // Webflow API endpoint
            const options = {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${WEBFLOW_API_TOKEN}`,
                    "Accept": "application/json" // Accept JSON response
                }
            };
            const response = await fetch(url, options); // Send DELETE request to Webflow API
            // Check for network errors
            if (!response.ok) {
                const errorData = await response.json(); // Extract error data from response
                return res.status(response.status).json({
                    error: errorData
                }); // Return error response
            }
            const json = await response.json(); // Parse JSON response
            return res.json({
                success: true,
                data: json
            }); // Return success response with data
        } catch (error) {
            console.error("Error deleting user accounts:", error);
            // Handle other potential errors
            return res.status(500).json({
                error: "Internal Server Error"
            }); // Return 500 Internal Server Error response
        }
    }
    // Handle other HTTP methods
    res.status(404).send("Not Found");
};


//# sourceMappingURL=index.js.map
