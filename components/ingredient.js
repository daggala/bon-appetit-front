import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const Box = styled.div`
  display: grid;
`;

const Ingredient = ({ dispatch, ing }) => {
  return (
    <Box>
      <TextField
        id="standard-required"
        label="Ingredient"
        number={ing.number}
        value={ing.ingredient}
        onChange={e =>
          dispatch({
            type: 'editIngredient',
            payload: {
              ingredient: e.target.value,
              number: ing.number
            }
          })
        }
      />
    </Box>
  );
};

export default Ingredient;
