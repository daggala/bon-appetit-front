import React, { useState } from "react";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { breakpoints } from "../../shared/variables";
import Ingredient from "./ingredient";
import AddRoundButton from "./addRoundButton";

const Ingredients = ({ ingredients, addItem, removeItem, error }) => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    event.preventDefault();
    return setInputValue(event.target.value);
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        addItem(e.target.value);
        setInputValue("");
      }
    }
  };

  return (
    <Container>
      <Column>
        <Title>Ingredients</Title>
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
            value={inputValue}
            onChange={handleChange}
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
            <AddRoundButton
              value={inputValue}
              onClick={() => {
                addItem(inputValue);
                setInputValue("");
              }}
            />
          </div>
        </div>
      </Column>
      <Column>
        <IngredientsContainer>
          {ingredients &&
            ingredients.map((ingredient, index) => {
              return (
                <Ingredient
                  key={index}
                  label={ingredient}
                  onDelete={() => removeItem(index)}
                  className={classes.chip}
                />
              );
            })}
        </IngredientsContainer>
      </Column>
    </Container>
  );
};

export default Ingredients;

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
}));

const Title = styled.h3`
  color: ${({ theme }) => theme.textColor};
  margin-left: 7px;
  margin-top: 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
  }
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
