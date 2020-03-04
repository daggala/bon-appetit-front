import React, { useReducer, useCallback, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { createRecipe } from '../../actions/createRecipe';
import RecipePhoto from '../../components/recipe-photo';
import Ingredient from '../../components/ingredient';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: 50px 10px;
`;

const Form = styled.form`
  display: grid;
`;

const Layout = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-template-rows: repeat(4, 1fr);
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
      case 'editIngredient':
        const arr = [...state.ingredients];
        arr[action.payload.number] = {
          ...arr[action.payload.number],
          ingredient: action.payload.ingredient
        };
        return {
          ...state,
          ingredients: arr
        };

      case 'addIngredient':
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            { ingredient: '', number: state.ingredients.length }
          ]
        };
      case 'changeName':
        return { ...state, title: action.payload };

      default:
        throw new Error();
    }
  };

  const intialState = {
    title: '',
    ingredients: [
      { ingredient: '', number: 0 },
      { ingredient: '', number: 1 },
      { ingredient: '', number: 2 }
    ]
  };

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [state, dispatch] = useReducer(reducer, intialState);

  const uploadImage = () => {
    let file = event.target.files[0];
    console.log('file ', file);
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  const submitRecipe = e => {
    e.preventDefault();
    const data = {
      ...state,
      ingredients: state.ingredients
        .filter(ingredientAndPortion => {
          return ingredientAndPortion.ingredient !== '';
        })
        .map(ingr => ingr.ingredient)
    };
    //createRecipe(data, image);
  };

  return (
    <Container>
      <Form onSubmit={submitRecipe} encType="multipart/form-data">
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
            <RecipePhoto image={imageUrl} uploadImage={uploadImage} />
          </Box>

          {state.ingredients.map(ing => {
            return (
              <Ingredient key={ing.number} dispatch={dispatch} ing={ing} />
            );
          })}
        </Layout>
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddCircleOutlineIcon />}
            onClick={() =>
              dispatch({
                type: 'addIngredient'
              })
            }
          >
            Add ingredients
          </Button>
        </div>
        <TextField
          id="outlined-multiline-static"
          label="Instructions"
          multiline
          rows="10"
          variant="outlined"
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
      </Form>
    </Container>
  );
};

export default CreateRecipe;
