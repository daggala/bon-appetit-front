import React from "react";
import Recipes from "../components/recipes";
import styled from "styled-components";
import { breakpoints } from "../shared/variables";
import { API_ROOT } from "../api-config";

const Container = styled.div`
  height: 100vh;
  margin: 100px 15px 30px 15px;
  @media (min-width: ${breakpoints.md}px) {
    margin-top: 130px;
  }
`;

const Home = () => {
  console.log("env ", process.env.NODE_ENV);
  console.log("API_ROOT ", API_ROOT);
  return (
    <Container>
      <Recipes url={`${API_ROOT}/recipe`} />
    </Container>
  );
};

export default Home;
