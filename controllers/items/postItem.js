var multer = require("multer");
var path = require("path");
var cloudinary = require("cloudinary").v2;

const Item = require("../../models/Item");
const validatePostItem = require("../../validation/postItem");
const cloudinaryUpload = require("../../config/cloudinaryConfig");

// cloudinary config
cloudinary.config({
  cloud_name: "drnobjzhr",
  api_key: "584864989394281",
  api_secret: "DgPIoId5hc825gbkhI-T_rUmtB8"
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array("images");

module.exports = (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send({ msg: err });
    } else {
      if (req.files === undefined || !req.files.length) {
        res.status(400).json({ msg: "Error: No image found!" });
      } else {
        imageData = {
          name: req.body.name,
          price: req.body.price,
          detail: req.body.detail
        };
        const { errors, isValid } = validatePostItem(imageData);
        // check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }

        const newItem = new Item({
          user: req.user.userId,
          name: req.body.name,
          price: req.body.price,
          detail: req.body.detail,
          images: []
        });

        newItem.save();

        const { _id: itemId } = newItem;

        const files = req.files;

        cloudinaryUpload.uploads({ files, itemId });

        res.status(200).json({ msg: newItem });
      }
    }
  });
};
