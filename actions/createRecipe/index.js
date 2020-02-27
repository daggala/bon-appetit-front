export const createRecipe = (recipe, file) => {
  const headers = {};

  const token = sessionStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const data = new FormData();
  data.append('title', recipe.title);
  data.append('ingredients', JSON.stringify(recipe.ingredients));
  data.append('file', file);

  function handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.msg);
    }
    return response;
  }

  return fetch('http://localhost:3003/recipe', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    body: data,
    headers: headers
  })
    .then(resp => {
      return resp;
    })
    .then(function(resp) {
      return handleErrors(resp);
    })
    .then(response => {
      return response;
    });
};
