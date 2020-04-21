import React, { useEffect, useState } from "react";
import { UserContext } from "../utils/context.js";
import Banner from "../components/banner";
import { login } from "../actions/login";
import { isJsonString } from "../utils/isJsonString";
import Router from "next/router";
import { ThemeProvider } from "styled-components";
import {
  createMuiTheme,
  ThemeProvider as MUIThemeProvider,
} from "@material-ui/core/styles";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});

  const theme = {
    colors: ["#b2d8d8", "#66b2b2", "#008080", "#006666", "#004c4c", "#003c3c"],
    textColor: "#383838",
  };

  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        light: theme.colors[1],
        main: theme.colors[2],
        dark: theme.colors[4],
        darker: theme.colors[5],
      },
    },
  });

  useEffect(() => {
    //Check every time app loads, on every page if the user is logged in
    const sessionUser = sessionStorage.getItem("user");
    isJsonString(sessionUser) ? setUser(JSON.parse(sessionUser)) : null;
  }, []);

  const logoutUser = () => {
    sessionStorage.setItem("token", null);
    sessionStorage.setItem("user", null);
    setUser(null);
    Router.push("/");
  };

  const loginUser = (formValues) => {
    return login(formValues).then((resp) => {
      const sessionUser = sessionStorage.getItem("user");
      setUser(JSON.parse(sessionUser));
      return resp;
    });
  };

  return (
    <MUIThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
          <Banner />
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </MUIThemeProvider>
  );
}

export default MyApp;
