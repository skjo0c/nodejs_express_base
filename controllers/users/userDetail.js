const User = require("../../models/User");

module.exports = async (req, res) => {
  await User.findOne({ _id: req.user.userId }).then(user => {
    if (user) {
      const {
        _id: id,
        username,
        email,
        firstName,
        lastName,
        address,
        mobile,
        avatar
      } = user;
      returnUser = {
        userId: id,
        username,
        email,
        firstName,
        lastName,
        address,
        mobile,
        avatar
      };
      res.status(200).send(returnUser);
    } else {
      res.status(404).json({ err: "User not found" });
    }
  });
};
