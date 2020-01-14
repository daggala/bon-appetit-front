import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Login from "./components/login.js";
import login from "./actions/login";
import fetch from "isomorphic-unfetch";
import Banner from "./components/banner";

// import "typeface-roboto";

const Home = props => {
  return (
    <div>
      <Banner />

      <div>Recipies</div>
    </div>
  );
};

Home.getInitialProps = async function() {
  const res = await fetch("http://localhost:3003/recipe");
  const data = await res.json();

  return {
    shows: data[0].title
  };
};

export default Home;
