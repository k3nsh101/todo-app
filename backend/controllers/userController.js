const Users = require('../models/userModel');
const hashPassword = require("../utils/hash").hashPassword;

exports.login = async function(req, res) {
    console.log("inside user controller login");
};

exports.register = async function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;

    password = hashPassword(password);

    try {
        const user = new Users({
            username,
            email,
            password,
        });
    
        const result = await user.save();
        res.status(201).send("User created successfully.");
    }
    catch (err){
        console.log(err);
    };
}