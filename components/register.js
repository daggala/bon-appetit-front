import React, { useReducer, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import isValidEmail from "../utils/isValidEmail";
import { API_ROOT } from "../api-config";

const Register = ({ onClickOutside, openLoginForm }) => {
  function reducer(state, action) {
    switch (action.type) {
      case "firstName":
        return { ...state, firstName: action.payload };
      case "lastName":
        return { ...state, lastName: action.payload };
      case "email":
        return { ...state, email: action.payload };
      case "firstPassword":
        return { ...state, firstPassword: action.payload };
      case "secondPassword":
        return { ...state, secondPassword: action.payload };
      case "error":
        return { ...state, error: action.payload, emailError: null };
      case "emailError":
        return { ...state, emailError: action.payload, error: null };
      case "lastNameError":
        return { ...state, lastNameError: action.payload, error: null };
      case "firstNameError":
        return { ...state, firstNameError: action.payload, error: null };
      default:
        throw new Error();
    }
  }

  const initialValues = {
    email: null,
    firstPassword: null,
    secondPassword: null,
    error: null,
    emailError: null,
    lastNameError: null,
    firstNameError: null,
    firstName: null,
    lastName: null,
  };
  const [formValues, dispatch] = useReducer(reducer, initialValues);

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClickOutside(false);
  };
  const onSubmit = (event) => {
    if (formValues.firstPassword !== formValues.secondPassword) {
      dispatch({
        type: "error",
        payload: "The passwords are not the same, try again",
      });
      return;
    } else if (!isValidEmail(formValues.email)) {
      dispatch({ type: "emailError", payload: "Email not valid" });
      return;
    } else if (!formValues.firstName) {
      dispatch({ type: "firstNameError", payload: "First name missing" });
      return;
    } else if (!formValues.lastName) {
      dispatch({ type: "lastNameError", payload: "Last name missing" });
      return;
    }
    event.preventDefault();

    const data = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.firstPassword,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    function handleErrors(response) {
      if (!response.success) {
        throw new Error(response.msg);
      }
      return response;
    }

    fetch(`${API_ROOT}/user`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      body: JSON.stringify(data),
      headers: headers,
    })
      .then((response) => response)
      .then((response) => response.json())
      .then((resp) => {
        if (!resp.success) {
          throw new Error(resp.msg);
        }
      })
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        dispatch({ type: "error", payload: error.message });
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Already registered? Click <b onClick={openLoginForm}>here</b> to
            login
          </DialogContentText>
          <p style={{ color: "red" }}>{formValues.error}</p>

          <form onSubmit={onSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              fullWidth
              required
              error={formValues.firstNameError ? true : false}
              helperText={formValues.firstNameError}
              onChange={(e) =>
                dispatch({
                  type: "firstName",
                  payload: e.target.value,
                })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              label="Last Name"
              fullWidth
              required
              error={formValues.lastNameError ? true : false}
              helperText={formValues.lastNameError}
              onChange={(e) =>
                dispatch({
                  type: "lastName",
                  payload: e.target.value,
                })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              required
              error={formValues.emailError}
              helperText={formValues.emailError}
              onChange={(event) => {
                dispatch({
                  type: "email",
                  payload: event.target.value,
                });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
              required
              onChange={(e) =>
                dispatch({ type: "firstPassword", payload: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password again"
              type="password"
              fullWidth
              required
              onChange={(event) => {
                dispatch({
                  type: "secondPassword",
                  payload: event.target.value,
                });
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Register;
