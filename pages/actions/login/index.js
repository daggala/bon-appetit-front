const login = (email, password, onSuccess) => {
  console.log("email ", email);
  console.log("password ", password);
  const headers = {
    "Content-Type": "application/json"
  };
  const token = sessionStorage.getItem("token");
  if (token) {
    headers.Authorization = token;
  }
  const data = {
    email: email,
    password: password,
    token: token
  };
  const resp =  fetch("http://localhost:3003/auth", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    body: JSON.stringify(data),
    headers: headers
  })
    .then(function(response) {
      return response.json();
    })
    .then(response => {
      console.log("response ", response);
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user", JSON.stringify(response.user));
      onSuccess(response);
    })
    .catch(error => {
      console.log(error);
      return error;
    });

    console.log('resp ', resp);
  
};

export default login;
