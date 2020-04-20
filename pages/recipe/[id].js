import React from "react";
import styled from "styled-components";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PersonIcon from "@material-ui/icons/Person";
import moment from "moment";
import fetch from "isomorphic-unfetch";
import { menuHeight, breakpoints } from "../../shared/variables";

const Container = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${menuHeight.phone + 30}px 15px 50px 15px;

  @media (min-width: ${breakpoints.sm}px) {
    margin: ${menuHeight.phone + 30}px 30px 50px 30px;
  }
  @media (min-width: ${breakpoints.md}px) {
    margin: ${menuHeight.desktop + 30}px 50px 50px 50px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const RecipeRow = styled(Row)`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 15px;
  @media (min-width: ${breakpoints.sm}px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeColumn = styled(Column)`
  max-width: 750px;
  margin-top: 30px;
`;

const SideBar = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-right: 80px;
`;

const Photo = styled.img`
  max-width: 100%;
  object-fit: cover;
`;

const DescriptionText = styled.p`
  margin: 0;
  line-height: 2em;
`;

const IngredientText = styled.p`
  margin: 0px 0px 10px 0px;
`;

const Title = styled.h1``;

const H3 = styled.h3`
  margin: 25px 0px 20px 0px;
`;

const Url = styled.a`
  color: black;
  text-decoration: none;
`;

const Recipe = ({ recipe, author }) => {
  // set the desired language
  moment.locale("en");

  // use one of the localized format strings
  var date = moment(recipe.createdAt).format("LL");

  const ingredients = recipe.ingredients || null;

  return (
    <Container>
      <Title>{recipe.title}</Title>

      <p style={{ margin: "0" }}>
        {`Author: ${author.firstName}${" "}${author.lastName}`}
      </p>
      <p
        style={{
          margin: "10px 0px 0px 0px",
          color: "grey",
          fontSize: "14px",
        }}
      >
        {date}
      </p>
      <RecipeRow>
        {recipe.url ? null : (
          <SideBar>
            <H3>Info</H3>
            {!recipe.cookTime ? null : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <QueryBuilderIcon />
                <p style={{ margin: "0px 10px" }}>
                  Cooking: {recipe.cookTime} mintues
                </p>
              </div>
            )}
            {!recipe.prepTime ? null : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <QueryBuilderIcon />

                <p style={{ margin: "0px 10px" }}>
                  Preparation: {recipe.prepTime} mintues
                </p>
              </div>
            )}
            {!recipe.servings ? null : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <PersonIcon />
                <p style={{ margin: "0px 10px" }}>{recipe.servings} portions</p>
              </div>
            )}

            {ingredients && ingredients.length > 0 ? (
              <div>
                <H3>Ingredients</H3>
                {ingredients.map((ing, index) => {
                  return <IngredientText key={index}>{ing}</IngredientText>;
                })}
              </div>
            ) : null}
          </SideBar>
        )}
        <RecipeColumn>
          <a href={recipe.url} target="_blank">
            <Photo src={recipe.imageUrl} />
          </a>
          {!recipe.url ? null : (
            <p>
              <Url href={recipe.url} target="_blank">
                Click here to open link to recipe
              </Url>
            </p>
          )}
          {recipe.description ? (
            <>
              <H3>Instructions</H3>
              <DescriptionText>{recipe.description}</DescriptionText>
            </>
          ) : null}
        </RecipeColumn>
      </RecipeRow>
    </Container>
  );
};

Recipe.getInitialProps = async function ({ query }) {
  const res = await fetch(`http://localhost:3003/recipe/oneRecipe/${query.id}`);
  const data = await res.json();

  const res2 = await fetch(`http://localhost:3003/user/${data.authorId}`);

  const data2 = await res2.json();

  return {
    recipe: data,
    author: data2.user,
  };
};
export default Recipe;
