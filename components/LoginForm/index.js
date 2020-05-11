import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UserContext } from "../../utils/context";
import useForm from "../../hooks/useForm";
import validateForm from "./validateForm";
import formFields from "./formFields";
import styled, { withTheme } from "styled-components";

const LoginForm = ({ onClickOutside, message, openRegisterForm }) => {
  const { loginUser } = useContext(UserContext);

  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");

  function login() {
    loginUser(values)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validateForm
  );

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

          <ErrorMessage>{error}</ErrorMessage>
          <form onSubmit={handleSubmit}>
            {formFields.map((field, index) => {
              return (
                <TextField
                  key={field.name}
                  name={field.name}
                  value={values[field.name] || ""}
                  label={field.label}
                  type={field.type}
                  error={errors[field.name] ? true : false}
                  helperText={errors[field.name]}
                  onChange={handleChange}
                  fullWidth
                  required
                  autoFocus={index === 0 ? true : false}
                />
              );
            })}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withTheme(LoginForm);

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.palette.primary.error};
`;
