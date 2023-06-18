const express = require('express');
const app = express();
let admin = require("firebase-admin");
const { createProxyMiddleware } = require("http-proxy-middleware");

let serviceAccount = require("./portal_admin_sdk.json");

// Initialize the app with a custom auth variable, limiting the server's access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use("*", async (req, res, next) => {
  const host = req.headers.host;

  console.log({
    host,
  });
  // Fetch the portal from the database
  const portalsSnapshot = await db
    .collection("portals")
    .where("customDomain", "==", host)
    .get();

    console.log({
      isEmpty: portalsSnapshot.empty,
    });
  // If there's no portal for this host, return a 404
  if (portalsSnapshot.empty) {
    res.status(404).send("Not found");
    return;
  }

  // Get the first matched portal's data
  const portalData = portalsSnapshot.docs[0].data();
console.log({ portalData });
  // Extract the target URL from the portal data.
  // This assumes that the target URL is stored in a field named 'targetUrl' in each portal document.
  // If the field has a different name, make sure to change 'targetUrl' to the correct field name.
  const { customDomain } = portalData;

  // Create a proxy middleware for this request
  const proxy = createProxyMiddleware({
    target: `https://${portalData.portalURL}.huehq.com`,
    changeOrigin: true,
    secure: false,
  });

  // Call the proxy
  proxy(req, res, next);
});

module.exports = app
