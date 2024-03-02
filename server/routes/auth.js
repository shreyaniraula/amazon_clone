const express = require("express");
const User = require("../models/user.js");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {

    try {
        // fetch data from user
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: "User with same email already exists." });
        }

        let user = new User({
            name,
            email,
            password,
        });

        user = await user.save();
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }

});

module.exports = authRouter;