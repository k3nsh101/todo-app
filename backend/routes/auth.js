const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/", authController.authenticate, (req, res) => {
    res.sendStatus(200);
});

router.post("/logout", authController.logout)

module.exports = router;