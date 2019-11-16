const Item = require("../../models/Item");

module.exports = async (req, res) => {
  try {
    const item = await Item.find({ user: req.user.userId });
    res.status(200).json({ item });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
