const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = require("../app.config").SECRET_KEY;

const loginController = function (req, res, next) {
    const { email = "", password = "" } = req.body || {};
    let fetchedUser;
    User.findOne({
      email,
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: "Invalid User Name or Password",
          });
        }
        // Compare password now
        fetchedUser = user;
        bcrypt.compare(password, user.password).then((isValid) => {
          if (!isValid) {
            return res.status(401).json({
              message: "Invalid User Name or Password",
            });
          }
          const token = jwt.sign(
            {
              email: fetchedUser.email,
              id: fetchedUser._id,
            },
            SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({
            token,
            expiresIn: 60,
            email,isRegistered: true, isAuth: true, userType: user && user.userType
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Server Error",
          err,
        });
      });
  };

  module.exports={
      loginController
  }