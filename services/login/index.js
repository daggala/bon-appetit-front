import { API_ROOT } from "../../api-config";

export const login = ({ email, password }) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = sessionStorage.getItem("token");
  if (token) {
    headers.Authorization = token;
  }
  const data = {
    email: email,
    password: password,
    token: token,
  };

  function handleErrors(response) {
    if (!response.ok) {
      throw new Error("Email or password are wrong");
    }
    return response;
  }

  return fetch(`${API_ROOT}/auth`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers,
  })
    .then((resp) => resp)
    .then((resp) => handleErrors(resp))

    .then(function (response) {
      return response.json();
    })
    .then((response) => {
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user", JSON.stringify(response.user));
      return response;
    });
};
