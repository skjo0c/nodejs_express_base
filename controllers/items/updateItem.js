const Item = require("../../models/Item");
const validatePostItem = require("../../validation/postItem");

module.exports = (req, res) => {
  Item.findOne({ _id: req.params.itemId, user: req.user.userId }).then(item => {
    if (item) {
      const { errors, isValid } = validatePostItem(req.body);
      // check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      Item.findOneAndUpdate(
        { user: req.user.userId, _id: req.params.itemId },
        { $set: req.body }
      ).then(item => res.json(item));
    } else {
      res.status(404).json({ err: "Item not found" });
    }
  });
};
