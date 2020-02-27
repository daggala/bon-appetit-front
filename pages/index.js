import React from 'react';
import fetch from 'isomorphic-unfetch';
import Recipes from '../components/recipes';

const Home = props => {
  console.log('props.recipes ', props.recipes);
  return <Recipes recipes={props.recipes} />;
};

Home.getInitialProps = async function() {
  // const res = await fetch(
  //   'https://api.spoonacular.com/recipes/search?apiKey=98bfa08b609646b593a4c0a436dcb7a3'
  // );
  // const data = await res.json();
  const res = await fetch('http://localhost:3003/recipe');
  const data = await res.json();
  return {
    recipes: data
  };
};

export default Home;
