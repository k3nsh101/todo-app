require('dotenv').config( {path: './config/.env'} );

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const mongoDB = process.env.DATABASE_URL;

const tasksRouter = require('./routes/tasks');
const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/category');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('public'))

app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/category', categoryRouter);

app.listen(port, function() {
    console.log(`App listening on the port http://localhost:${port}/`);
});

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(mongoDB);
}