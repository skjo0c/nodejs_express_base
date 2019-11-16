var cloudinary = require("cloudinary").v2;
const { ObjectId } = require("mongoose").Types;
const Item = require("../models/Item");

cloudinary.config({
  cloud_name: "cloudinaryName",
  api_key: "xxxxxxxxxxxxxx",
  api_secret: "xxxxxxxxxxxxxxx"
});

// uploading the image to cloudinary

exports.uploads = (req, res) => {
  // res_promises will be an array of promises
  let res_promises = req.files.map(
    file =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.path,
          { folder: "foldername", use_filename: true, unique_filename: false },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
      })
  );
  // Promise.all will fire when all promises are resolved
  Promise.all(res_promises)
    .then(result => {
      Item.findOne({ _id: req.itemId }).then(item => {
        if (item) {
          item.images = result;
          item.save();
        }
      });
    })
    .catch(error => {
      /*  handle error */
      console.log(error, "err");
    });
};
