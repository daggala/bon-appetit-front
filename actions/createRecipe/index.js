export const createRecipe = (recipe, ingredients, image) => {
  const headers = {};

  const token = sessionStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  console.log("recipe ", recipe, "ingredients ", ingredients, "image ", image);

  const data = new FormData();
  data.append("title", recipe.title);
  recipe.portions ? data.append("servings", recipe.portions) : null;
  data.append("minutes", recipe.time);
  data.append("instructions", recipe.instructions);
  recipe.link ? data.append("url", recipe.link) : null;
  ingredients ? data.append("ingredients", JSON.stringify(ingredients)) : null;
  recipe.instructions ? data.append("description", recipe.instructions) : null;
  image ? data.append("file", image) : null;

  function handleErrors(response) {
    if (!response.ok) {
      console.log("response ", response);
      throw new Error(response.msg);
    }
    return response;
  }

  console.log("data ", data);
  return fetch("http://localhost:3003/recipe", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    body: data,
    headers: headers,
  })
    .then((resp) => {
      return resp;
    })
    .then(function (resp) {
      return handleErrors(resp);
    })
    .then((resp) => {
      console.log("resp ", resp);
      return resp;
    });
};
