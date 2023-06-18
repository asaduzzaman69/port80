const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');


app.get('*',  createProxyMiddleware({ 
    target: 'https://huehq.com/', // target host
    changeOrigin: true, // needed for virtual hosted sites
}));


module.exports = app
