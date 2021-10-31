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
        const { email, password } = req.body; 
        if(!email || !password) {
            return res.status(400).json({errorMessage: "pls enter all required fields"});
            //can we just make this an alert???
        }
        
        const existingUser = await User.findOne({ email: email });
        if(!existingUser){
            return res.status(401).json({errorMessage: "this user does not exist"});
        }
        console.log("returned existing user");
        console.log(existingUser);
        let flag = false;
        let firstName = existingUser.firstName;
        let lastName = existingUser.lastName;
        let e = existingUser.email;
        let passwordHash = existingUser.passwordHash;
        bcrypt.compare(password, existingUser.passwordHash, function(err, data) {
            if (err){
              // handle error
            }
            if (data) {
              // Send JWT
              flag = true;

              //return res.status(200).json({ msg: "Login success" })
            } 
            else {
              // response is OutgoingMessage object that server response http request
              return res.status(401).json({ msg: "Invalid credential" })
            }
        });

        if(flag){
            const user = new User({
                firstName, lastName, e, passwordHash
              });
                //const savedUser = await newUser.save();
        
                // LOGIN THE USER
              const token = auth.signToken(user);
              
              await res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
                }).status(200).json({
                    msg: "Login successful",
                    success: true,
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }
                }).send();
        }
        
        //res.status(200).json({data: existingUser}).send();

    }
    catch(error){
        console.error(err);
        res.status(403).json({ msg: "BAD LOGIN" }).send();
        //idk if it should be like this
    }
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify) {
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
            firstName, lastName, email, passwordHash
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
                email: savedUser.email
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
    registerUser
}