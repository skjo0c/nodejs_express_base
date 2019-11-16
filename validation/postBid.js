const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostItem(data) {
  let errors = {};
  receiveDate = new Date(data.receiveDate);
  returnDate = new Date(data.returnDate);

  data.receiveDate = !isEmpty(data.receiveDate) ? data.receiveDate : "";
  data.returnDate = !isEmpty(data.returnDate) ? data.returnDate : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.receiveDate)) {
    errors.msg = "Receive Date field is required";
  }
  if (Validator.isEmpty(data.returnDate)) {
    errors.msg = "Return Date field is required";
  }
  if (Validator.isISO8601("yyyy-mm-dd")) {
    errors.msg = "Receive Date is not valid";
  }
  if (Validator.isISO8601("yyyy-mm-dd")) {
    errors.msg = "Return Date is not valid";
  }
  if ((receiveDate || returnDate) < new Date()) {
    errors.msg = "Receive Date should cannot be less than today";
  }
  if (returnDate < receiveDate) {
    errors.msg = "Return Date should greater than Receive Date";
  }
  if (Validator.isEmpty(data.price)) {
    errors.msg = "Price field is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
