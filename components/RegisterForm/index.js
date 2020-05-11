import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { register as registerUser } from "../../services/register";
import useForm from "../../hooks/useForm";
import validateForm from "./validateForm";
import formFields from "./formFields";
import styled, { withTheme } from "styled-components";

const RegisterForm = ({ onClickOutside, openLoginForm }) => {
  const [isDialogOpen, setDialogOpen] = useState(true);
  const [error, setError] = useState("");

  const register = (param) => {
    registerUser(param)
      .then(() => {
        setDialogOpen(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    register,
    validateForm
  );

  return (
    <div>
      {isDialogOpen ? (
        <Dialog
          open={isDialogOpen}
          onClose={() => onClickOutside(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Already registered? Click <b onClick={openLoginForm}>here</b> to
              login
            </DialogContentText>
            <p style={{ color: "red" }}>{error}</p>

            <form onSubmit={handleSubmit} id="form1">
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
            <Button onClick={() => onClickOutside(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={!isDialogOpen} onClose={() => onClickOutside(false)}>
          <DialogTitle id="form-dialog-title">
            You have successfully registered!
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => onClickOutside(false)} color="primary">
              Continue to website
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default withTheme(RegisterForm);

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.palette.primary.error};
`;
