import React, { useContext } from "react";
import fetch from "isomorphic-unfetch";
import Recipes from "../components/recipes";
import Link from "next/link";
import { logout } from "../actions/login";
import { UserContext } from "../utils/context";

const Home = props => {
  const { logoutUser } = useContext(UserContext);
  return (
    <>
      <Link href="/login">
        <p>Login</p>
      </Link>
      <Link href="/register">
        <p>Register</p>
      </Link>
      <div onClick={logoutUser}>Logout </div>
      <Recipes recipes={props.recipes} />
    </>
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
