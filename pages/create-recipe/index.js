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
  const reducer = (state, action) => {
    switch (action.type) {
      case 'addIngredient':
        const doesExist = state.ingredients.find(
          ingr => ingr.number === action.payload.number
        );

        if (doesExist) {
          const arr = state.ingredients.map(ingr =>
            ingr.number === action.payload.number
              ? { ...ingr, ingredient: action.payload.ingredient }
              : ingr
          );
          return {
            ...state,
            ingredients: arr
          };
        }

        return {
          ...state,
          ingredients: [...state.ingredients, action.payload]
        };

      case 'changeName':
        return { ...state, title: action.payload };

      default:
        throw new Error();
    }
  };

  const intialState = {
    title: '',
    ingredients: []
  };

  const [image, setImage] = useState(null);

  const [state, dispatch] = useReducer(reducer, intialState);

  const uploadImage = () => {
    let file = event.target.files[0];
    setImage(file);
  };

  const submitRecipe = e => {
    e.preventDefault();
    createRecipe(state, image);
  };

  return (
    <Container>
      <form onSubmit={submitRecipe} encType="multipart/form-data">
        <Layout>
          <Box>
            <TextField
              id="standard-required"
              label="Name"
              onChange={e =>
                dispatch({ type: 'changeName', payload: e.target.value })
              }
            />
          </Box>
          <Box image>
            <RecipePhoto
              image={image ? image.url : null}
              uploadImage={uploadImage}
            />
          </Box>
          <Box>
            <TextField
              id="standard-required"
              label="Ingredient"
              onChange={e =>
                dispatch({
                  type: 'addIngredient',
                  payload: { ingredient: e.target.value, number: 0 }
                })
              }
            />
          </Box>
          <Box>
            <TextField
              id="standard-required"
              label="Ingredient"
              onChange={e =>
                dispatch({
                  type: 'addIngredient',
                  payload: { ingredient: e.target.value, number: 1 }
                })
              }
            />
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
      </form>
    </Container>
  );
};

export default CreateRecipe;
