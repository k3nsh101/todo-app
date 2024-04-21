const passport = require("passport");

const Users = require("../models/userModel");

exports.authenticate = passport.authenticate("local");

exports.status = (req, res) => {
    return req.user ? res.send(req.user.id) : res.sendStatus(401);
}

exports.logout = (req, res) => {
    if (!req.user) return res.sendStatus(401);
    req.logout((err) => {
        if (err) return response.sendStatus(400);
        res.sendStatus(200);
    })
};
