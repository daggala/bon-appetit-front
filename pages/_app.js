import React, { useEffect, useState } from "react";
import { UserContext } from "../utils/context.js";
import Banner from "../components/banner";
import { login } from "../actions/login";
import { isJsonString } from "../utils/isJsonString";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

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

  const loginUser = formValues => {
    return login(formValues).then(resp => {
      const sessionUser = sessionStorage.getItem("user");
      setUser(JSON.parse(sessionUser));
      return resp;
    });
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      <Banner />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
