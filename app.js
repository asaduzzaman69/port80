const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');


app.get('/',  (req,res) => {

    res.send('Hello world')
});


module.exports = app
