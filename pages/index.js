import React from "react";
import Recipes from "../components/recipes";
import styled from "styled-components";
import { breakpoints } from "../shared/variables";

const Container = styled.div`
  height: 100vh;
  margin: 100px 15px 30px 15px;
  @media (min-width: ${breakpoints.md}px) {
    margin-top: 130px;
  }
`;

const Home = () => {
  return (
    <Container>
      <Recipes url="http://localhost:3003/recipe" />
    </Container>
  );
};

export default Home;
