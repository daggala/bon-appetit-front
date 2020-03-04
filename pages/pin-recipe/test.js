import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { createRecipe } from '../../actions/createRecipe';
import RecipePhoto from '../../components/recipe-photo';

const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: 50px 10px;
`;

const Layout = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(7, 1fr);
  max-width: 900px;
  min-width: 100px;
`;

const Box = styled.div`
  display: grid;
  grid-row: ${props => (props.image ? 'span 4' : null)};
`;

const CreateRecipe = () => {
  const submitRecipe = e => {
    e.preventDefault();
    createRecipe(state, image);
  };

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeName':
        return { ...state, title: action.payload };
      case 'changeLink':
        return { ...state, link: action.payload };
      case 'submitForm':
        action.payload.preventDefault();
        if (state.title === null || state.title === '') {
          return { ...state, error: 'Title of the recipe is missing' };
        } else if (state.link === null || state.link === '') {
          return { ...state, error: 'Link to recipe is missing' };
        } else if (image === null) {
          return { ...state, error: 'Please provide a photo of the recipe' };
        } else {
          createRecipe(state, image);
        }
      default:
        throw new Error();
    }
  };

  const intialState = {
    title: '',
    link: '',
    error: ''
  };

  const [state, dispatch] = useReducer(reducer, intialState);

  const uploadImage = () => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  return (
    <Container>
      <form
        onSubmit={e => dispatch({ type: 'submitForm', payload: e })}
        encType="multipart/form-data"
      >
        {state.error ? <p style={{ color: 'red' }}>{state.error}</p> : null}
        <Layout>
          <Box>
            <TextField
              id="standard-required"
              label="Name"
              onChange={e =>
                dispatch({ type: 'changeName', payload: e.target.value })
              }
            />
            <TextField
              id="standard-required"
              label="Link to recipe"
              onChange={e =>
                dispatch({ type: 'changeLink', payload: e.target.value })
              }
            />
          </Box>
          <Box image>
            <RecipePhoto image={imageUrl} uploadImage={uploadImage} />
          </Box>

          <div style={{ marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
            >
              Submit recipe
            </Button>
          </div>
        </Layout>
      </form>
    </Container>
  );
};

export default CreateRecipe;
