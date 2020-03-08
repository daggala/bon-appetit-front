import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Recipes from '../components/recipes';
import Demo from '../components/demo';


async function loadRecipes(offset) {
  const headers = {
    'Content-Type': 'application/json'
  };
  const data = {
    offset: 0,
    limit: 6
  };
  return fetch(`http://localhost:3003/recipe/recipe?offset=${0}`, {
    method: 'GET',
    headers: headers
  })
    .then(resp => {
      return resp;
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log('resp ', resp);
      return resp;
    })
    .catch(err => {
      console.log('err ', err);
    });
}

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    loadRecipes(0).then(rec => {
      setRecipes(rec);
    });
  }, []);

  return <Recipes recipes={recipes} loadMore={loadRecipes} />;
  //return <Demo />
};

export default Home;
