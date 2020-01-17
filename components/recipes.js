import React from "react";
import Recipe from "./recipe";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0px 20px;
`;

const Recipes = ({ recipes }) => {
  return (
    <Container>
      {recipes.map(recipe => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </Container>
  );
};

export default Recipes;

Recipes.getInitialProps = async function() {
  const res = await fetch(
    "https://api.spoonacular.com/recipes/search?apiKey=98bfa08b609646b593a4c0a436dcb7a3"
  );
  const data = await res.json();
  return {
    recipes: data.results
  };
};
