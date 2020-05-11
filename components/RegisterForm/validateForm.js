import isEmailValid from "../../utils/isEmailValid";

export default function validate(values) {
  let errors = {};
  if (!values.firstName) {
    errors.firstName = "First name is missing";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is missing";
  }
  if (values.password !== values.passwordAgain) {
    errors.password = "The passwords are not the same, try again";
  }
  if (!values.password) {
    errors.password = "Password is missing";
  }
  if (!values.passwordAgain) {
    errors.passwordAgain = "You need to type the same password twice";
  }
  if (!isEmailValid(values.email)) {
    errors.email = "Email not valid";
  }
  return errors;
}
