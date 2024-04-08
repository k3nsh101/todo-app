require('dotenv').config( {path: './config/.env'} );

const express = require('express');

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'pug');


app.get('/', function(req, res) {
    res.render('index')
})

app.listen(port, function() {
    console.log(`App listening on the port http://localhost:${port}/`);
})