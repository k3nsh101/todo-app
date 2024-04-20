const passport = require("passport");

const Users = require("../models/userModel");

exports.authenticate = passport.authenticate("local");

exports.logout = (req, res) => {
    if (!req.user) return res.sendStatus(401);
    req.logout((err) => {
        if (err) return response.sendStatus(400);
        res.sendStatus(200);
    })
};
