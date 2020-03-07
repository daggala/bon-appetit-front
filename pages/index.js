import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Recipes from '../components/recipes';

async function loadRecipes(offset) {
  console.log('offset ', offset);
  const headers = {
    'Content-Type': 'application/json'
  };
  const data = {
    offset: 0,
    limit: 6
  };
  return fetch('http://localhost:3003/recipe/getChunk', {
    method: 'POST',
    body: JSON.stringify(data),
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
};

export default Home;
