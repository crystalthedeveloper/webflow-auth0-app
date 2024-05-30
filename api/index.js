var $7Uu7Z$express = require("express");
var $7Uu7Z$httpproxymiddleware = require("http-proxy-middleware");
var $7Uu7Z$dotenv = require("dotenv");



var $8c7a90f1c90ba1b0$require$createProxyMiddleware = $7Uu7Z$httpproxymiddleware.createProxyMiddleware;

$7Uu7Z$dotenv.config();
const $8c7a90f1c90ba1b0$var$app = $7Uu7Z$express();
// CORS middleware
$8c7a90f1c90ba1b0$var$app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "https://firststep-46e83b.webflow.io");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
// Handle preflight requests
$8c7a90f1c90ba1b0$var$app.options("*", (req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "https://firststep-46e83b.webflow.io");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(200).send();
});
// DELETE route for deleting user by email
$8c7a90f1c90ba1b0$var$app.delete("/api/deleteUser", (req, res)=>{
    const { email: email } = req.body;
    // Add your logic here to handle the deletion of the user by email
    // For example, you can delete the user from the database or make additional requests to external APIs
    res.status(200).json({
        message: `User with email ${email} deleted successfully`
    });
});
// Proxy middleware options
const $8c7a90f1c90ba1b0$var$options = {
    target: "https://api.webflow.com",
    changeOrigin: true,
    pathRewrite: {
        "^/api": ""
    },
    onProxyReq: (proxyReq, req, res)=>{
        // Debug: Log the target and headers to verify
        console.log(`Proxying request to: ${$8c7a90f1c90ba1b0$var$options.target}`);
        console.log("Request headers:", req.headers);
        proxyReq.setHeader("Authorization", `Bearer ${"327ee845b726bd57582609e4e09f49ebf127a13505929147b8791fd7eac3d451"}`);
    },
    onProxyRes: (proxyRes, req, res)=>{
        // Debug: Log the response headers
        console.log("Response headers:", proxyRes.headers);
    }
};
// Debug: Log the entire options object
console.log("Proxy options:", $8c7a90f1c90ba1b0$var$options);
// Create the proxy
const $8c7a90f1c90ba1b0$var$apiProxy = $8c7a90f1c90ba1b0$require$createProxyMiddleware($8c7a90f1c90ba1b0$var$options);
// Use the proxy middleware
$8c7a90f1c90ba1b0$var$app.use("/api", $8c7a90f1c90ba1b0$var$apiProxy);
const $8c7a90f1c90ba1b0$var$PORT = "1234";
$8c7a90f1c90ba1b0$var$app.listen($8c7a90f1c90ba1b0$var$PORT, ()=>{
    console.log(`Proxy server is running on port ${$8c7a90f1c90ba1b0$var$PORT}`);
});


//# sourceMappingURL=index.js.map
