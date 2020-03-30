import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const AddButton = styled.button`
  background-color: transparent;
  border: none;
  padding: none;
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  chip: {
    width: "min-content",
    marginLeft: "7px",
    marginTop: "7px"
  },
  add: {
    fontSize: 40
  }
}));

const Ingredients = ({ dispatch, ingredients, theme }) => {
  const classes = useStyles();

  const [tempIngredient, setTempIngredient] = useState(null);
  const [isButtonHovered, setButtonHover] = useState(false);

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch({
        type: "addIngredient",
        payload: e.target.value
      });
      setTempIngredient("");
    }
  };

  return (
    <>
      <h3 style={{ color: theme.textColor, marginLeft: "7px" }}>Ingredients</h3>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {ingredients.map(ing => {
          return (
            <Chip
              key={ing.number}
              label={ing.ingredient}
              onDelete={() =>
                dispatch({ type: "deleteIngredient", payload: ing.number })
              }
              className={classes.chip}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <TextField
          id="outlined-basic"
          label="Add ingredient"
          value={tempIngredient}
          onChange={e => {
            e.preventDefault();
            return setTempIngredient(e.target.value);
          }}
          variant="outlined"
          onKeyDown={handleKeyDown}
          fullWidth
        />

        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            marginLeft: "10px"
          }}
        >
          <AddButton
            type="button"
            onClick={() => {
              dispatch({
                type: "addIngredient",
                payload: tempIngredient
              });
              setTempIngredient("");
            }}
            disabled={!tempIngredient}
          >
            {isButtonHovered ? (
              <AddCircleIcon
                className={classes.add}
                style={{ fontSize: 40, color: theme.colors[2] }}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
              />
            ) : (
              <AddCircleOutlineIcon
                className={classes.add}
                style={{ fontSize: 40, color: theme.colors[2] }}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
              />
            )}
          </AddButton>
        </div>
      </div>
    </>
  );
};

export default withTheme(Ingredients);
