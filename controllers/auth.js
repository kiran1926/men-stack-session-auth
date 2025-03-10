const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// NOTE: there are no routes here yet

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

//the router object is  similar to the app object in server js
// however, it only has router functionality

//  sign-up
router.post("/sign-up", async(req,res) => {
    const userIndatabase = await User.findOne({ username: req.body.username});
    if(userIndatabase){
        return res.send("Username is already taken.");
    }
    // check password and confrimPassword are a match
    if(req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm password do not match!");
    }

    // creating encrypted version of password (hashed and salted)
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword; 
    
    //create user after above validations
    const user = await User.create(req.body);
    res.send(`Thanks for signing up ${user.username}`);
});

// sign-in form get
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

// signing -in post
router.post("/sign-in", async(req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username});
    if(!userInDatabase) {
        return res.send ("Login Failed. please try again!");
    }

    //check if passowrd is correct
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    );
    if(!validPassword) {
        return res.send("Login Failed. please try again!");
    }

    // session creation for user
    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id,
    };
    res.redirect("/");
});

module.exports = router;