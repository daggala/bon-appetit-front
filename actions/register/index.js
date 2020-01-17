const register = (email, password) => {
  const headers = {
    "Content-Type": "application/json"
  };

  const data = {
    firstName: "Dagny",
    lastName: "Gudmunds",
    email: "heyyyyyjo",
    password: password
  };

  return fetch("http://localhost:3003/user", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    body: JSON.stringify(data),
    headers: headers
  })
    .then(resp => {
      console.log(resp);
      return resp.json();
    })
    .then(resp => resp);
};

export default register;
