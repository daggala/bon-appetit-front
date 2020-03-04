import React from 'react';
import Recipe from './recipe';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  justify-items: center;
  margin: 10px 20px;
`;

const Recipes = ({ recipes }) => {
  return (
    <Container>
      {recipes
        ? recipes.map(recipe =>
            recipe.imageUrl ? <Recipe key={recipe.id} recipe={recipe} /> : null
          )
        : null}
    </Container>
  );
};

export default Recipes;
