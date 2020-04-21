import React, { useReducer, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UserContext } from "../utils/context";
import isValidEmail from "../utils/isValidEmail";

export default function Login({ onClickOutside, message, openRegisterForm }) {
  function reducer(state, action) {
    switch (action.type) {
      case "email":
        return { ...state, email: action.payload };
      case "password":
        return { ...state, password: action.payload };
      case "emailError":
        return { ...state, emailError: action.payload, errorMessage: null };
      case "passwordError":
        return { ...state, passwordError: action.payload, errorMessage: null };
      case "errorMessage":
        return {
          ...state,
          errorMessage: action.payload,
          passwordError: null,
          emailError: null,
        };
      default:
        throw new Error();
    }
  }

  const initialForm = {
    email: null,
    password: null,
    emailError: null,
    passwordError: null,
    errorMessage: null,
  };

  const [formValues, dispatch] = useReducer(reducer, initialForm);
  const { loginUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    if (!formValues.email) {
      dispatch({ type: "emailError", payload: "Email address missing" });
      return;
    } else if (!formValues.password) {
      dispatch({ type: "passwordError", payload: "Password missing" });
      return;
    } else if (!isValidEmail(formValues.email)) {
      dispatch({ type: "emailError", payload: "Email not valid" });
      return;
    }

    event.preventDefault();
    loginUser(formValues)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        dispatch({
          type: "errorMessage",
          payload: error.message,
        });
      });
  };

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClickOutside(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          <DialogContentText>
            Not already registered? Click <b onClick={openRegisterForm}>here</b>{" "}
            to register
          </DialogContentText>

          <p style={{ color: "red" }}>{formValues.errorMessage}</p>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              required
              error={formValues.emailError ? true : false}
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
              error={formValues.passwordError ? true : false}
              helperText={formValues.passwordError}
              onChange={(event) => {
                dispatch({
                  type: "password",
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
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
            color="primary"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
