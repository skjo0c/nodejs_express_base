const Item = require("../../models/Item");

module.exports = async (req, res) => {
  try {
    const items = await Item.find({}).lean();
    res.status(200).send(items);
  } catch (err) {
    console.log(err, "err");
  }
};
