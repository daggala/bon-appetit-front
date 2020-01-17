import React, { useEffect, useState } from "react";
import { UserContext } from "../utils/context.js";
import Banner from "../components/banner";
import { isJsonString } from "../utils/isJsonString";

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
  };

  const loginUser = () => {
    const sessionUser = sessionStorage.getItem("user");
    setUser(JSON.parse(sessionUser));
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      <Banner />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
