import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Recipes from '../components/recipes';
import Demo from '../components/demo';



const Home = () => {

  return <Recipes  />;
  //return <Demo />
};

export default Home;
