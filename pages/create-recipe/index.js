import React, { useReducer, useState } from "react";
import styled, { withTheme } from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { createRecipe } from "../../actions/createRecipe";
import RecipePhoto from "../../components/recipe-photo";
import Ingredients from "./ingredients.js";
import PersonIcon from "@material-ui/icons/Person";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { useForm, Controller } from "react-hook-form";
import createOptions from "./createOptions.js";
import { InputLabel } from "@material-ui/core";

import "./style.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
`;

const Title = styled.div`
  margin-bottom: 20px;
`;

const CreateRecipe = ({ theme }) => {
  const { control, handleSubmit, register, errors } = useForm();

  const reducer = (state, action) => {
    console.log("action.payload ", action.payload);
    switch (action.type) {
      case "deleteIngredient":
        return {
          ...state,
          ingredients: state.ingredients.filter(
            ingr => ingr.number !== action.payload
          )
        };
      case "addIngredient":
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            {
              ingredient: action.payload,
              number: state.ingredients.length
            }
          ]
        };
      default:
        throw new Error();
    }
  };

  const intialState = {
    ingredients: []
  };

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [state, dispatch] = useReducer(reducer, intialState);
  const [age, setAge] = React.useState("");

  const handleChange = event => {
    setAge(event.target.value);
  };

  const uploadImage = () => {
    let file = event.target.files[0];
    console.log("file ", file);
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  const submitRecipe = data => {
    const ingredients = {
      ...state,
      ingredients: state.ingredients
        .filter(ingredientAndPortion => {
          return ingredientAndPortion.ingredient !== "";
        })
        .map(ingr => ingr.ingredient)
    };
    console.log("data ", data);
    console.log("image ", image);
    console.log("ingredients ", ingredients);
    createRecipe(data, ingredients, image);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitRecipe)} encType="multipart/form-data">
        <Title>
          <Controller
            as={
              <TextField
                id="standard-error-helper-text"
                label="Title"
                error={errors.title}
                helperText={errors.title ? "Title is missing" : null}
                placeholder="fx. Hot Tomato soup with basil leaves"
                fullWidth
                inputProps={{
                  style: {
                    fontSize: 25,
                    fontWeight: "bold",
                    color: theme.textColor
                  }
                }}
                inputRef={register({
                  required: true
                })}
              />
            }
            name="title"
            control={control}
          />
        </Title>

        <RecipePhoto image={imageUrl} uploadImage={uploadImage} />
        <h3 style={{ color: theme.textColor, marginLeft: "7px" }}>
          Number of servings
        </h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <PersonIcon fontSize="large" />
          </div>
          <FormControl
            style={{ minWidth: 300 }}
            error={Boolean(errors.wordlevel)}
            required
          >
            <InputLabel id="demo-simple-select-required-label">
              How many servings?
            </InputLabel>
            <Controller
              as={
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={age}
                  onChange={handleChange}
                >
                  {createOptions()}
                </Select>
              }
              name="servings"
              control={control}
            />
          </FormControl>
        </div>
        <div style={{ margin: "25px 0px" }}>
          <h3 style={{ color: theme.textColor }}>Cooking Time</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Controller
              as={
                <TextField
                  required
                  type="number"
                  id="tentacles"
                  name="tentacles"
                  min="0"
                />
              }
              name="time"
              control={control}
            />
            <p style={{ marginLeft: "20px" }}>minutes</p>
          </div>
        </div>
        <Ingredients dispatch={dispatch} ingredients={state.ingredients} />
        <Controller
          as={
            <TextField
              required
              id="outlined-multiline-static"
              label="Instructions"
              multiline
              rows="10"
              variant="outlined"
            />
          }
          name="instructions"
          control={control}
        />
        <div style={{ marginTop: "20px" }}>
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

export default withTheme(CreateRecipe);
