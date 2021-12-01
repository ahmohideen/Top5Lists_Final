const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')


getLoggedIn = async (req, res) => {
    try {
        auth.verify(req, res, async function () {
            try {
                console.log("at get logged in")
                const loggedInUser = await User.findOne({ _id: req.userId });
                return res.status(200).json({
                    loggedIn: true,
                    user: {
                        firstName: loggedInUser.firstName,
                        lastName: loggedInUser.lastName,
                        email: loggedInUser.email
                    }
                }).send();
            }
            catch(error) {
                res.status(401).json({ msg: "GETLOGGEDIN PROBLEM" }).send();
            }    
            })
    }
    catch(error){
        console.log(error);
    }
    
}

loginUser = async(req, res) => {
    try {
        const { userName, password } = req.body; 
        if(!userName || !password) {
            return res.status(400).json({errorMessage: "pls enter all required fields"});
            //can we just make this an alert???
        }
        
        const existingUser = await User.findOne({ userName: userName });
        if(!existingUser){
            return res.status(401).json({errorMessage: "this user does not exist"});
        }
        console.log("returned existing user");
        console.log(existingUser);
        let flag = false;

        const match = await bcrypt.compare(password, existingUser.passwordHash);

        if(match){
                //const savedUser = await newUser.save();
        
                // LOGIN THE USER
              const token = auth.signToken(existingUser);
              
              await res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
                }).status(200).json({
                    msg: "Login successful",
                    success: true,
                    user: {
                        firstName: existingUser.firstName,
                        lastName: existingUser.lastName,
                        email: existingUser.email,
                        userName: existingUser.userName
                    }
                }).send();
        }
        else{
            return res.status(402).json({errorMessage: "this password is incorrect"});
        }
        
        //res.status(200).json({data: existingUser}).send();

    }
    catch(error){
        console.error(err);
        res.status(403).json({ msg: "BAD LOGIN" }).send();
        //idk if it should be like this
    }
}

logoutUser = async(req, res) => {
    console.log("logging out from within user controller")
    try {
        await res.clearCookie("token").status(200).json({
            success: true,
            msg: "LOGGED OUT"
        }).send();
    }
    catch(error){
        console.error(error);
        res.status(500).send();
    }
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, userName, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify || !userName) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(401)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(402)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }

        const existingUser = await User.findOne({ email: email });
        //CHANGE THIS^^^ TO USERNAME CHECK!!!
        if (existingUser) {
            return res
                .status(403)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, userName, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                userName: savedUser.userName
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    loginUser,
    logoutUser,
    registerUser
}