import React, { useContext } from "react";
import styled from "styled-components";
import Recipes from "../../components/recipes";
import { UserContext } from "../../utils/context";
import { breakpoints, menuHeight } from "../../shared/variables";

const Container = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: ${menuHeight.phone + 25}px;
  @media (min-width: ${breakpoints.md}px) {
    margin-top: ${menuHeight.desktop + 25}px;
  }
`;

const Title = styled.h1`
  margin: 0px 15px 5px 15px;
  text-align: center;
`;

function MyRecipes() {
  const { user } = useContext(UserContext);
  return (
    <Container>
      <Title>Recipes I've pinned or created</Title>
      <Recipes
        url={`http://localhost:3003/recipe/myrecipes/${user.id}`}
        myRecipes
      />
    </Container>
  );
}

export default MyRecipes;
