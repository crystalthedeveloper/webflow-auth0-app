var $44ACY$express = require("express");
var $44ACY$httpproxymiddleware = require("http-proxy-middleware");
var $44ACY$dotenv = require("dotenv");
var $44ACY$cors = require("cors");
require("node-fetch");



var $dc3d2287a8387781$require$createProxyMiddleware = $44ACY$httpproxymiddleware.createProxyMiddleware;



$dc3d2287a8387781$importAsync$c012307197ada658.then((fetch1)=>{
// Now you can use fetch here
}).catch((err)=>{
    console.error("Failed to import node-fetch:", err);
});
$44ACY$dotenv.config();
const $dc3d2287a8387781$var$app = $44ACY$express();
// CORS middleware
$dc3d2287a8387781$var$app.use($44ACY$cors({
    origin: "https://firststep-46e83b.webflow.io",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));
// Handle preflight requests
$dc3d2287a8387781$var$app.options("*", $44ACY$cors());
// Body parsing middleware
$dc3d2287a8387781$var$app.use($44ACY$express.json());
// Function to add user to Webflow CMS collection
async function $dc3d2287a8387781$var$addMemberToCMS(email) {
    try {
        const url = `https://api.webflow.com/v2/collections/${"6658bd9d61addf55d7168071"}/items`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${"6120a097eb56ff67a7c6921b2057ac307dcd72c5df9b39ece164fa38615ea725"}`
            },
            body: JSON.stringify({
                fields: {
                    email: email
                }
            })
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("User added to CMS collection:", data);
    } catch (error) {
        console.error("Error adding user to CMS collection:", error);
    }
}
// Signup route
$dc3d2287a8387781$var$app.post("/signup", async (req, res)=>{
    const { email: email, password: password } = req.body;
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await $dc3d2287a8387781$var$addMemberToCMS(email); // Add user to membership CMS collection
        res.status(200).json({
            message: "User signed up successfully"
        });
    } catch (error) {
        console.error("Sign-up error:", error.message);
        res.status(500).json({
            error: "Error signing up"
        });
    }
});
const $dc3d2287a8387781$var$PORT = "1234";
$dc3d2287a8387781$var$app.listen($dc3d2287a8387781$var$PORT, ()=>{
    console.log(`Server is running on port ${$dc3d2287a8387781$var$PORT}`);
});


//# sourceMappingURL=index.js.map
