var $7Uu7Z$express = require("express");
var $7Uu7Z$httpproxymiddleware = require("http-proxy-middleware");
var $7Uu7Z$dotenv = require("dotenv");
require("node-fetch");



var $8c7a90f1c90ba1b0$require$createProxyMiddleware = $7Uu7Z$httpproxymiddleware.createProxyMiddleware;


$8c7a90f1c90ba1b0$importAsync$c3666201f05dcae.then((fetch1)=>{
// Now you can use fetch here
}).catch((err)=>{
    console.error("Failed to import node-fetch:", err);
});
$7Uu7Z$dotenv.config();
const $8c7a90f1c90ba1b0$var$app = $7Uu7Z$express();
// CORS middleware
$8c7a90f1c90ba1b0$var$app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "https://firststep-46e83b.webflow.io");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
// Handle preflight requests
$8c7a90f1c90ba1b0$var$app.options("*", (req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "https://firststep-46e83b.webflow.io");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(200).send();
});
// Body parsing middleware
$8c7a90f1c90ba1b0$var$app.use($7Uu7Z$express.json());
// POST route for updating user quiz completion count
$8c7a90f1c90ba1b0$var$app.post("/api/updateUser", async (req, res)=>{
    const { email: email, newQuizCompletionCount: newQuizCompletionCount } = req.body;
    try {
        const response = await fetch(`https://api.webflow.com/users/${email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${"327ee845b726bd57582609e4e09f49ebf127a13505929147b8791fd7eac3d451"}`
            },
            body: JSON.stringify({
                "quiz-completion-count": newQuizCompletionCount
            })
        });
        const json = await response.json();
        if (response.ok) res.status(200).json({
            message: `Webflow user account updated successfully for ${email}`,
            data: json
        });
        else res.status(400).json({
            error: "Failed to update Webflow user account",
            data: json
        });
    } catch (error) {
        console.error("Error updating Webflow user account:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});
// DELETE route for deleting user account
$8c7a90f1c90ba1b0$var$app.delete("/api/deleteUser", async (req, res)=>{
    const { email: email } = req.body;
    try {
        const response = await fetch(`https://api.webflow.com/users/${email}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${"327ee845b726bd57582609e4e09f49ebf127a13505929147b8791fd7eac3d451"}`
            }
        });
        const json = await response.json();
        if (response.ok) res.status(200).json({
            message: `Webflow user account deleted successfully for ${email}`,
            data: json
        });
        else res.status(400).json({
            error: "Failed to delete Webflow user account",
            data: json
        });
    } catch (error) {
        console.error("Error deleting Webflow user account:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
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
