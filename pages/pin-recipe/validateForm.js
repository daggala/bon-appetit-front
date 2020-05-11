export default function validateForm(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Please enter a title";
  }
  if (!values.url) {
    errors.url = "Please enter a URL";
  }

  return errors;
}
