import { API_ROOT } from "../../api-config";
import { login } from "../login";

export const register = (data) => {
  const headers = {
    "Content-Type": "application/json",
  };

  function handleError(response) {
    if (response.statusCode === 409) {
      throw new Error("User already exists");
    }
    return response;
  }

  return fetch(`${API_ROOT}/user`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers,
  })
    .then((response) => response)
    .then((response) => response.json())
    .then((response) => handleError(response))
    .then(() => {
      login({ email: data.email, password: data.password });
    });
};
