export const login = ({ email, password }) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  const token = sessionStorage.getItem('token');
  if (token) {
    headers.Authorization = token;
  }
  const data = {
    email: email,
    password: password,
    token: token
  };

  function handleErrors(response) {
    if (!response.ok) {
      throw new Error('Email or password are wrong');
    }
    return response;
  }

  return fetch('http://localhost:3003/auth', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    body: JSON.stringify(data),
    headers: headers
  })
    .then(resp => resp)
    .then(resp => handleErrors(resp))

    .then(function(response) {
      return response.json();
    })
    .then(response => {
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('user', JSON.stringify(response.user));
      return response;
    });
};
