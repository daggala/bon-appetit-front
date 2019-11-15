import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Login from "./components/login.js";
import login from "./actions/login";
import fetch from "isomorphic-unfetch";

const Home = props => {
  console.log("props ", props);
  return (
    <div>
      <Login login={login} />
      <button onClick={login}>Login</button>
    </div>
  );
};

Home.getInitialProps = async function() {
  const res = await fetch("http://localhost:3003/recipe");
  const data = await res.json();

  console.log("data ", data);
  return {
    shows: data[0].title
  };
};

export default Home;
