import React, { useContext } from "react";
import styled from "styled-components";
import Recipes from "../../components/recipes";
import { UserContext } from "../../utils/context";
import { breakpoints, menuHeight } from "../../shared/variables";
import { API_ROOT } from "../../api-config";

function MyRecipes() {
  const { user } = useContext(UserContext);
  return (
    <Container>
      <Title>Recipes I've pinned or created</Title>
      <Recipes url={`${API_ROOT}/recipe/myrecipes/${user.id}`} myRecipes />
    </Container>
  );
}

export default MyRecipes;

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
