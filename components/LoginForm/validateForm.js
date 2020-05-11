import isEmailValid from "../../utils/isEmailValid";

export default function validateForm(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is missing";
  }
  if (!values.password) {
    errors.password = "Password is missing";
  }
  if (!isEmailValid(values.email)) {
    errors.email = "Email not valid";
  }
  return errors;
}
