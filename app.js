const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');


app.get('*',  createProxyMiddleware({ 
    target: 'https://portal-a229a.web.app/login', // target host
    changeOrigin: true, // needed for virtual hosted sites
}));


module.exports = app
