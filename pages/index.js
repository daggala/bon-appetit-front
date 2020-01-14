import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Login from "./components/login.js";
import login from "./actions/login";
import fetch from "isomorphic-unfetch";
import Banner from "./components/banner";
import Recipes from "./components/recipes";
// import "typeface-roboto";

const Home = props => {
  return (
    <div>
      <Banner />
      <Recipes recipes={props.recipes} />
    </div>
  );
};

Home.getInitialProps = async function() {
  const res = await fetch(
    "https://api.spoonacular.com/recipes/search?apiKey=98bfa08b609646b593a4c0a436dcb7a3"
  );
  const data = await res.json();
  return {
    recipes: data.results
  };
};

export default Home;
