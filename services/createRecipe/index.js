import { API_ROOT } from "../../api-config";

export const createRecipe = (values) => {
  const headers = {};
  const token = sessionStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const data = new FormData();
  Object.keys(values).forEach((key) => {
    const value =
      key === "ingredients" ? JSON.stringify(values[key]) : values[key];
    value ? data.append(key, value) : null;
  });

  function handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.msg);
    }
    return response;
  }

  return fetch(`${API_ROOT}/recipe`, {
    method: "POST",
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
      return resp;
    });
};
