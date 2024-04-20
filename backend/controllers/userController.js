const Users = require('../models/userModel');

exports.login = async function(req, res) {
    console.log("inside user controller login");
};

exports.register = async function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

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