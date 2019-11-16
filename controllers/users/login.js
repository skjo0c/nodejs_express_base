const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../models/User");

const validateLogin = require("../../validation/login");

module.exports = (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // check password
    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        const payload = {
          id: user.id,
          email: user.email
        };

        // generate jwt token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: "30d" },
          (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          }
        );
      } else {
        res.status(200).json({ err: "Password doesn't match" });
      }
    });
  });
};
