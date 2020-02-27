import React from 'react';
import Recipe from './recipe';
import styled from 'styled-components';

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
      {recipes
        ? recipes.map(recipe =>
            recipe.imageUrl ? <Recipe key={recipe.id} recipe={recipe} /> : null
          )
        : null}
    </Container>
  );
};

export default Recipes;
