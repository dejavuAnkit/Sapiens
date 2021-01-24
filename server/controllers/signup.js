const User = require("../model/user");
const bcrypt = require("bcrypt");

const SECRET_KEY = require("../app.config").SECRET_KEY;

const signUpController = async (req, res) => {
    const { email = "", password = "", userType } = req.body || {};

    User.findOne({email}, (err, dbRes )=>{
        if(err){
            return res.status(501).json({message:'There was error signing you up'})
        }
        if(dbRes){
            return res.status(501).json({"message": 'There was issue creating user'})
        }
        bcrypt
        .hash(password, 10)
        .then(function (hashPassword) {
          return hashPassword;
        })
        .then(function (hashPassword) {
          const user = new User({ email, password: hashPassword, userType, isRegistered: true });
          user
            .save()
            .then((result) => {
              res.status(201).json({ 
                message: "User created successfully", 
              });
            })
            .catch((err) => { 
              res.status(501).json({
                message:
                  "There was error creating user, please try after some time",
              });
            });
        });
    })
}

module.exports = {
    signUpController 
} 