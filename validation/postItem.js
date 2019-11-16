const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostItem(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.detail = !isEmpty(data.detail) ? data.detail : "";

  if (Validator.isEmpty(data.name)) {
    errors.msg = "Name field is required";
  }
  if (Validator.isEmpty(data.price)) {
    errors.msg = "Price field is required";
  }
  if (Validator.isEmpty(data.detail)) {
    errors.msg = "Detail field is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
