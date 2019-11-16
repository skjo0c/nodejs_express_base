const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.msg = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.msg = "Email is not valid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.msg = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.msg = "Password should be between 8 and 20";
  }

  return { errors, isValid: isEmpty(errors) };
};
