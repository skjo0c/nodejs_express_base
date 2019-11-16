const Item = require("../../models/Item");

module.exports = async (req, res) => {
  await Item.findOne({ _id: req.params.itemId, user: req.user.userId }).then(
    item => {
      if (item) {
        item.remove();
        res.status(200).send({ msg: "Item deleted successfully!" });
      } else {
        res.status(404).json({ err: "Item not found" });
      }
    }
  );
};
