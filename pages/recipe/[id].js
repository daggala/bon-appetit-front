import React from "react";
import styled from "styled-components";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PersonIcon from "@material-ui/icons/Person";
import moment from "moment";

const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: 50px 50px;
`;

// grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

const Layout = styled.div`
  display: grid;
  // grid-gap: 40px;
  // grid-template-rows: repeat(4, auto);
  max-width: 900px;
  min-width: 100px;
  // grid-columns: 2;
  @media screen and (max-width: 850px) {
    grid-columns: 1;
  }
`;

const Box = styled.div`
  display: grid;
  // grid-row: ${(props) => (props.image ? "span 2" : null)};
  // grid-column: ${(props) => (props.span ? `span ${props.span}` : null)};
`;

const Photo = styled.img`
  max-width: 100%;
  object-fit: cover;
`;

const Title = styled.h1``;

const Paragraph = styled.p`
  margin: 0;
`;

const Recipe = ({ recipe }) => {
  // set the desired language
  moment.lang("is");

  // use one of the localized format strings
  var s = moment(recipe.createdAt).format("LL");
  return (
    <Container>
      <Layout>
        <Box>
          <Title>{recipe.title}</Title>
          <p style={{ margin: "0" }}>Höfundur: Dagný Lára Guðmundsdóttir</p>
          <p style={{ color: "grey", fontSize: "14px" }}>{s}</p>
        </Box>
        <Box image>
          <Photo src={recipe.imageUrl} />
        </Box>

        <Box>
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
          <div>
            <h3>Hráefni</h3>
            {recipe.ingredients && ingredients.length > 0
              ? recipe.ingredients.map((ing) => {
                  return <p style={{ margin: "0" }}>{ing}</p>;
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

  return {};
};
export default Recipe;
