import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import RecipePhoto from '../../components/recipe-photo';

const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: 50px 50px;
`;

const Layout = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-template-rows: repeat(4, 10px);
  max-width: 900px;
  min-width: 100px;
`;

const Box = styled.div`
  display: grid;
  grid-row: ${props => (props.image ? 'span 4' : null)};
`;

const Photo = styled.img`
  height: 300px;
  width: 300px;
  object-fit: cover;
`;

const Recipe = ({ recipe }) => {
  return (
    <Container>
      <Layout>
        <Box>
          <p>{recipe.title}</p>
        </Box>
        <Box image>
          <Photo src={recipe.imageUrl} />
        </Box>
        {/* 
        {recipe.ingredients.length > 0
          ? recipe.ingredients.map(ing => {
              return <p>{ing}</p>;
            })
          : null} */}
      </Layout>
    </Container>
  );
};

Recipe.getInitialProps = async function({ query }) {
  const res = await fetch(`http://localhost:3003/recipe/recipe?id=${query.id}`);
  const data = await res.json();
  return {
    recipe: data
  };

  return {};
};
export default Recipe;
