import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.editEmail = this.editEmail.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  editEmail(event) {
    this.setState({ email: event.target.value });
  }
  editPassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <Input
              type="text"
              value={this.state.email}
              onChange={this.editEmail}
            />
          </label>
          <label>
            Password:
            <Input
              type="password"
              value={this.state.password}
              onChange={this.editPassword}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Container>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default Login;
