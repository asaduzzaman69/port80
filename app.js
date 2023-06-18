const express = require('express');
const app = express();


app.get('*', (req, res) => {
    res.redirect('https://portal-a229a.web.app/login');
});


module.exports = app
