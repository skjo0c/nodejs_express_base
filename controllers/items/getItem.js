const Item = require("../../models/Item");

module.exports = async (req, res) => {
  await Item.findOne({ _id: req.params.itemId })
    .populate("user", ["firstName", "lastName", "mobile"])
    .then(item => {
      if (item) {
        res.status(200).send(item);
      } else {
        res.status(404).json({ err: "Item not found" });
      }
    });
};
