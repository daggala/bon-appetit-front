export default function validateForm(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is missing";
  }
  if (!values.servings) {
    errors.servings = "Please enter how many portions";
  }
  if (!values.prepTime) {
    errors.prepTime = "Please enter prep time";
  }
  if (!values.title) {
    errors.cookTime = "Please enter cooking time";
  }
  if (!values.description) {
    errors.description = "Please enter instructions";
  }

  return errors;
}
