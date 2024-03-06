const express = require("express");
const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware.js");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {

    try {
        // fetch data from user
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: "User with same email already exists." });
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            name,
            email,
            password: hashedPassword,
        });

        user = await user.save();
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }

});

authRouter.post("/api/signin", async (req, res) => {

    try {
        // fetch data from user
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "User with this email does not exist"})
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);

        if(!passwordMatch){
            return res.status(400).json({message: "Incorrect password"})
        }

        const token = jwt.sign({id: user._id}, "passwordKey");

        res.json({token, ...user._doc})
    }
    catch(e){
        res.status(500).json({ error: e.message });
    }
});

authRouter.post("/tokenIsValid", async(req, res)=>{
    try{
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);

        const isVerified = jwt.verify(token, 'passwordKey');
        if(!isVerified) return res.json(false);

        const user = await User.findById(isVerified.id);
        if(!user) return res.json(false);

        res.json(true);
    }catch(e){
        res.status(500).json({error: e.message});
    }
});

authRouter.post("/", auth, async(req, res)=>{
    const user = await User.findById(req.user);
    res.json({...user._doc, token: res.token});
})
module.exports = authRouter;