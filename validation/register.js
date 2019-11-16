const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegister(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.username, { min: 4, max: 15 })) {
    errors.msg = "Username must be between 4 to 15 characters";
  }
  if (!Validator.isLength(data.firstName, { min: 4, max: 15 })) {
    errors.msg = "First name must be between 4 to 40 characters";
  }
  if (!Validator.isLength(data.firstName, { min: 4, max: 15 })) {
    errors.msg = "Last name must be between 4 to 40 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.msg = "Username field is required";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.msg = "First name is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.msg = "Last name is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.msg = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.msg = "Email is not valid";
  }
  if (Validator.isEmpty(data.mobile)) {
    errors.msg = "Mobile field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.msg = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.msg = "Confirm Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.msg = "Password should be between 8 and 20";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.msg = "Password must match";
  }

  return { errors, isValid: isEmpty(errors) };
};
