const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ]
});

module.exports = Item = mongoose.model("item", ItemSchema);
