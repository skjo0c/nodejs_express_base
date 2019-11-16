// load user model
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const validateRegister = require("../../validation/register");

module.exports = (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    address,
    mobile
  } = req.body;

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });
      const newUser = new User({
        username,
        email,
        password,
        firstName,
        lastName,
        address,
        mobile,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};
