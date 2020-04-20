import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { menuHeight, breakpoints } from "../../shared/variables";

const StyledSVG = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderColor: theme.palette.primary.main,
    borderWidth: "1px",
    borderStyle: "solid",
    margin: "5px",
    "&:hover": {
      borderColor: theme.palette.primary.dark,

      "& .MuiSvgIcon-root , & .MuiChip-deleteIcon": {
        color: theme.palette.primary.dark,
      },
    },
    "& .MuiSvgIcon-root , & .MuiChip-deleteIcon": {
      color: theme.palette.primary.main,
    },
  },
}))(Chip);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
  }
`;

const AddButton = styled.button`
  background-color: transparent;
  border: none;
  padding: none;
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 30px;
  margin-top: 20px;
  @media (min-width: ${breakpoints.md}px) {
    margin-left: 20px;
    margin-top: 50px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    width: "min-content",
    marginLeft: "7px",
    marginTop: "7px",
  },
  add: {
    fontSize: 40,
  },
}));

const Ingredients = ({ dispatch, ingredients, error, theme }) => {
  const classes = useStyles();

  const [tempIngredient, setTempIngredient] = useState("");
  const [isButtonHovered, setButtonHover] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        dispatch({
          type: "addIngredient",
          payload: e.target.value,
        });
        setTempIngredient("");
      }
    }
  };

  return (
    <Container>
      <Column>
        <h3
          style={{
            color: theme.textColor,
            marginLeft: "7px",
            marginTop: "0px",
          }}
        >
          Ingredients
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "460px",
          }}
        >
          <TextField
            style={{ width: "460px" }}
            id="outlined-basic"
            label="Add ingredient"
            value={tempIngredient}
            onChange={(e) => {
              e.preventDefault();
              return setTempIngredient(e.target.value);
            }}
            variant="outlined"
            onKeyDown={handleKeyDown}
            fullWidth
            error={error}
            helperText={
              error ? "You should enter at least one ingredient" : null
            }
          />

          <div
            style={{
              marginTop: "15px",
              marginBottom: "15px",
              marginLeft: "10px",
            }}
          >
            <AddButton
              type="button"
              onClick={() => {
                dispatch({
                  type: "addIngredient",
                  payload: tempIngredient,
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
      </Column>
      <Column>
        <IngredientsContainer>
          {ingredients &&
            ingredients.map((ing) => {
              return (
                <StyledSVG
                  key={ing.number}
                  label={ing.ingredient}
                  onDelete={() =>
                    dispatch({ type: "deleteIngredient", payload: ing.number })
                  }
                  className={classes.chip}
                />
              );
            })}
        </IngredientsContainer>
      </Column>
    </Container>
  );
};

export default withTheme(Ingredients);
