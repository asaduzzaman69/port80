const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');


app.get('*',  createProxyMiddleware({ 
    target: 'https://myreactapp.com', // target host
    changeOrigin: true, // needed for virtual hosted sites
}));


module.exports = app
