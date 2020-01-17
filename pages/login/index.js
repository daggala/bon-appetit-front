import React, { useState, useContext, useReducer } from "react";
import styled from "styled-components";
import { UserContext } from "../../utils/context";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(214, 218, 218);
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
`;

const Input = styled.input`
  margin-left: 10px;
  margin-bottom: 50px;
  margin-top: 50px;
  font-size: 14px;
  height: 25px;
  background-color: transparent;
  color: #333;
  outline: none;
  border-top-width: 0;
  border-right-width: 0;
  border-left-width: 0;
  border-bottom-color: grey;
  border-bottom-width: 1px;
  :focus {
    border-bottom-width: 2px;
  }
  ::placeholder  {
    color: grey;
  }
`;

const Login = () => {
  function reducer(state, action) {
    switch (action.type) {
      case "email":
        return { ...state, email: action.payload };
      case "password":
        return { ...state, password: action.payload };
      default:
        throw new Error();
    }
  }

  const initialForm = {
    email: "",
    password: ""
  };

  const [formValues, dispatch] = useReducer(reducer, initialForm);

  const [error, setError] = useState("");
  const { user, login, logoutUser } = useContext(UserContext);

  const handleSubmit = event => {
    event.preventDefault();
    login(formValues)
      .then(resp => {
        //To change the context user if success
        loginUser();
      })
      .catch(error => setError(error));
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <Input
            type="text"
            value={formValues.email}
            onChange={event => {
              dispatch({
                type: "email",
                payload: event.target.value
              });
            }}
          />
        </label>
        <label>
          Password:
          <Input
            type="password"
            value={formValues.password}
            onChange={event => {
              dispatch({
                type: "password",
                payload: event.target.value
              });
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {error ? <p>Not a valid username or password</p> : null}
      {user ? <p>Welcom {user.firstName}</p> : null}
      <button onClick={logoutUser}>Logout</button>
    </Container>
  );
};

export default Login;
