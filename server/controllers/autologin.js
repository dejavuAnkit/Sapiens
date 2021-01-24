const User = require("../model/user");
const jwt = require("jsonwebtoken");

const SECRET_KEY = require("../app.config").SECRET_KEY;

const autoLoginController = (req, res) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        isRegistered: false,
        isAuth: false,
      });
    }
    const { email='' } = decoded || {};
    User.findOne({ email })
      .then((user) => {
          return res.status(200).json({
            email,isRegistered: true, isAuth: true, userType: user && user.userType
          })
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Internal Server Error",
          err,
        });
      });
  });
};

module.exports = {
  autoLoginController,
};
