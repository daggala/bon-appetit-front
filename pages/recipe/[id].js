import React from "react";
import styled from "styled-components";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PersonIcon from "@material-ui/icons/Person";
import moment from "moment";
import fetch from "isomorphic-unfetch";
import { menuHeight, breakpoints } from "../../shared/variables";

const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: ${menuHeight.phone}px 50px 50px 50px;
  @media (min-width: ${breakpoints.md}px) {
    margin-top: ${menuHeight.desktop}px;
  }
`;

const Layout = styled.div`
  display: grid;
  max-width: 900px;
  min-width: 100px;
`;

const Box = styled.div`
  display: grid;
  margin-bottom: 20px;
`;

const Photo = styled.img`
  max-width: 100%;
  object-fit: cover;
`;

const Title = styled.h1``;

const Recipe = ({ recipe }) => {
  // set the desired language
  moment.locale("is");

  // use one of the localized format strings
  var s = moment(recipe.createdAt).format("LL");
  return (
    <Container>
      <Layout>
        <Box>
          <Title>{recipe.title}</Title>
          <p style={{ margin: "0" }}>Höfundur: Dagný Lára Guðmundsdóttir</p>
          <p style={{ color: "grey", fontSize: "14px" }}>{s}</p>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <QueryBuilderIcon />
            <p style={{ margin: "0px 10px" }}>{recipe.minutes} mínútur</p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <PersonIcon />
            <p style={{ margin: "0px 10px" }}> fyrir {recipe.servings}</p>
          </div>
        </Box>
        <Box image>
          <Photo src={recipe.imageUrl} />
        </Box>

        <Box>
          <div>
            <h3>Hráefni</h3>
            {recipe.ingredients && recipe.ingredients.length > 0
              ? recipe.ingredients.map((ing, index) => {
                  return (
                    <p style={{ margin: "0" }} key={index}>
                      {ing}
                    </p>
                  );
                })
              : null}
          </div>
        </Box>
        <Box span={2}>
          <h3>Leiðbeiningar</h3>
          <p>{recipe.description}</p>
        </Box>
      </Layout>
    </Container>
  );
};

Recipe.getInitialProps = async function ({ query }) {
  const res = await fetch(
    `http://localhost:3003/recipe/baba/recipe?id=${query.id}`
  );
  const data = await res.json();
  return {
    recipe: data,
  };
};
export default Recipe;
