import React from "react";
import Input from "@material-ui/core/Input";
import Layout from "../../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Register = () => {
  const classes = useStyles();

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
    <form className={classes.root} onSubmit={onSubmit}>
      <Input placeholder="First Name" />
      <Input placeholder="Last Name" />
      <Input placeholder="E-mail" />
      <Input placeholder="Password" type="password" />
      <Button variant="contained" size="small" color="primary" type="submit">
        Register
      </Button>
    </form>
  );
};

export default Register;
