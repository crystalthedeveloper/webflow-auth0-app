var $43HA1$dotenv = require("dotenv");
var $43HA1$express = require("express");
var $43HA1$cors = require("cors");
var $43HA1$httpproxymiddleware = require("http-proxy-middleware");



var $84a264530b3fb4fb$require$createProxyMiddleware = $43HA1$httpproxymiddleware.createProxyMiddleware;


$43HA1$dotenv.config();
const $84a264530b3fb4fb$var$app = $43HA1$express();
// Enable CORS for your frontend application
$84a264530b3fb4fb$var$app.use($43HA1$cors({
    origin: "https://firststep-46e83b.webflow.io",
    methods: [
        "GET",
        "POST",
        "DELETE",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
}));
// Proxy middleware options
const $84a264530b3fb4fb$var$options = {
    target: "https://api.webflow.com",
    changeOrigin: true,
    pathRewrite: {
        "^/api": ""
    },
    onProxyReq: (proxyReq, req, res)=>{
        // Debug: Log the target and headers to verify
        console.log(`Proxying request to: ${$84a264530b3fb4fb$var$options.target}`);
        proxyReq.setHeader("Authorization", `Bearer ${"327ee845b726bd57582609e4e09f49ebf127a13505929147b8791fd7eac3d451"}`);
    }
};
// Debug: Log the entire options object
console.log("Proxy options:", $84a264530b3fb4fb$var$options);
// Create the proxy
const $84a264530b3fb4fb$var$apiProxy = $84a264530b3fb4fb$require$createProxyMiddleware($84a264530b3fb4fb$var$options);
// Use the proxy middleware
$84a264530b3fb4fb$var$app.use("/api", $84a264530b3fb4fb$var$apiProxy);
const $84a264530b3fb4fb$var$PORT = "1234";
$84a264530b3fb4fb$var$app.listen($84a264530b3fb4fb$var$PORT, ()=>{
    console.log(`Proxy server is running on port ${$84a264530b3fb4fb$var$PORT}`);
});


//# sourceMappingURL=index.js.map
