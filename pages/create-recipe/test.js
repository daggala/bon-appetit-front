import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: 50px;
`;

const Layout = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: repeat(7, 1fr);
  max-width: 900px;
  min-width: 100px;
`;

const Box = styled.div`
  display: grid;
  grid-row: ${props => (props.image ? 'span 4' : null)};
`;

const ImageInput = styled.input`
  margin-top: 30px;
  background-color: green;
`;

const CreateRecipe = () => {
  return (
    <Container>
      <Layout>
        <Box>
          <TextField id="standard-required" label="Name" />
        </Box>
        <Box image>
          <ImageInput type="image" />
        </Box>
        <Box>
          <TextField id="standard-required" label="Ingredient" />
        </Box>
        <Box>
          <TextField id="standard-required" label="Ingredient" />
        </Box>
        <Box>
          <TextField id="standard-required" label="Ingredient" />
        </Box>
        <Box>
          <TextField id="standard-required" label="Ingredient" />
        </Box>
        <Box>
          <TextField id="standard-required" label="Ingredient" />
        </Box>
        <Box>
          <TextField id="standard-required" label="Ingredient" />
        </Box>
        <Box>
          <TextField id="standard-required" label="Ingredient" />
        </Box>
      </Layout>
      <TextField
        id="standard-required"
        label="Instructions"
        multiline
        rows="10"
      />
    </Container>
  );
};

export default CreateRecipe;
