import $lVf1n$express from "express";
import $lVf1n$bodyparser from "body-parser";
import $lVf1n$nodefetch from "node-fetch";
import $lVf1n$dotenv from "dotenv";





(0, $lVf1n$dotenv).config();
const $5ef8cbb8c4725867$var$app = (0, $lVf1n$express)();
$5ef8cbb8c4725867$var$app.use((0, $lVf1n$bodyparser).json());
const $5ef8cbb8c4725867$var$WEBFLOW_API_TOKEN = "327ee845b726bd57582609e4e09f49ebf127a13505929147b8791fd7eac3d451";
const $5ef8cbb8c4725867$var$WEBFLOW_SITE_ID = "65f0d5739b651eae06b2ca56";
$5ef8cbb8c4725867$var$app.post("/delete-webflow-account", async (req, res)=>{
    const { userId: userId } = req.body;
    if (!userId) return res.status(400).json({
        error: "User ID is required"
    });
    try {
        const url = `https://api.webflow.com/v2/sites/${$5ef8cbb8c4725867$var$WEBFLOW_SITE_ID}/users/${userId}`;
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${$5ef8cbb8c4725867$var$WEBFLOW_API_TOKEN}`,
                "Accept": "application/json"
            }
        };
        const response = await (0, $lVf1n$nodefetch)(url, options);
        const json = await response.json();
        if (response.ok) res.json({
            success: true,
            data: json
        });
        else res.status(response.status).json({
            error: json
        });
    } catch (error) {
        console.error("Error deleting Webflow user account:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});
var $5ef8cbb8c4725867$export$2e2bcd8739ae039 = $5ef8cbb8c4725867$var$app;


export {$5ef8cbb8c4725867$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.js.map
