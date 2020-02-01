import React, { useReducer, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const Register = ({ onClickOutside }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClickOutside(false);
  };
  const onSubmit = event => {
    event.preventDefault();

    const data = {
      firstName: "Dagnyyy",
      lastName: "Gudmunds",
      email: "dagga@dagga.is",
      password: "123"
    };
    const headers = {
      "Content-Type": "application/json"
    };

    fetch("http://localhost:3003/user", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      body: JSON.stringify(data),
      headers: headers
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        return setHits(data);
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
          <form onSubmit={onSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password again"
              type="password"
              fullWidth
              required
              onChange={event => {
                dispatch({
                  type: "password",
                  payload: event.target.value
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
            onClick={e => {
              handleClose();
              handleSubmit(e);
            }}
            color="primary"
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Register;
