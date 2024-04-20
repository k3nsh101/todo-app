require('dotenv').config( {path: './config/.env'} );
require("./strategies/localStrategy");

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");

const port = process.env.PORT || 3000;
const mongoDB = process.env.DATABASE_URL;

const tasksRouter = require('./routes/tasks');
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/users');
const authRouter = require("./routes/auth");

const app = express();
app.use(cors({credentials: true, origin: "http://localhost:5173"}));

app.use(session({secret: "cats", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/tasks', tasksRouter);
app.use('/category', categoryRouter);
app.use('/users', userRouter);
app.use("/auth", authRouter);

app.listen(port, function() {
    console.log(`App listening on the port http://localhost:${port}/`);
});

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(mongoDB);
}