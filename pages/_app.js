import React, { useEffect, useState } from "react";
import { UserContext } from "../utils/context.js";
import Banner from "../components/Banner";
import { login } from "../services/login";
import { isJsonString } from "../utils/isJsonString";
import Router from "next/router";
import { ThemeProvider } from "styled-components";
import {
  createMuiTheme,
  ThemeProvider as MUIThemeProvider,
} from "@material-ui/core/styles";
import theme from "../styles/theme.js";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});

  const muiTheme = createMuiTheme(theme);

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

  if (process.env.NODE_ENV === "production") {
    console.log = function () {};
  }

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
