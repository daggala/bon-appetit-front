import React, { useReducer, useState, useEffect } from "react";
import styled, { withTheme } from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { createRecipe } from "../../actions/createRecipe";
import RecipePhoto from "../../components/recipe-photo";
import Ingredients from "./ingredients.js";
import PersonIcon from "@material-ui/icons/Person";
import { useForm, Controller } from "react-hook-form";
import { menuHeight, breakpoints } from "../../shared/variables";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import "./style.css";
import Router from "next/router";

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: ${menuHeight.phone + 30}px 10px 50px 10px;
  @media (min-width: ${breakpoints.sm}px) {
    margin-right: 40px;
    margin-left: 50px;
  }
  @media (min-width: ${breakpoints.md}px) {
    margin-top: ${menuHeight.desktop + 50}px;
  }
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

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
    max-width: 900px:
    justify-content: space-between;
  
  }
 

`;

const PhotoRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
  align-items: center;
  height: 100%;
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const NumberField = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;

  @media (min-width: ${breakpoints.xs}px) {
    flex-direction: column;
  }
  @media (min-width: ${breakpoints.sm}px) {
    flex-direction: row;
  }
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: column;
  }
`;

const NumberFieldTitle = styled.h3`
  margin-right: 50px;
`;

const Separator = styled.div`
  width: 1px;
  background-color: #005c4c;
  opacity: 0.5;
  margin-left: 60px;
  margin-right: 60px;
  margin-top: 10px;
`;

const Instructions = styled.div`
  width: 100%;
  height: 100%;

  @media (min-width: ${breakpoints.md}px) {
    margin-left: 30px;
  }
`;

const Multiline = styled.textarea`
  width: 100%;
  margin-left: 0px;
  border-width: 1px;
  outline: none;
  padding: 20px;
  font-size: 16px;
  font-family: Roboto;
  vertical-align: top;
  border-radius: 5px;
  background-color: #fafafa;
  border-color: ${(props) => (props.error ? "#f44336" : "rgba(0, 0, 0, 0.23)")};
  &:focus {
    border-color: #006666;
  }
  height: 300px;
  @media (min-width: ${breakpoints.md}px) {
    height: 88%;
  }
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
            (ingr) => ingr.number !== action.payload
          ),
        };
      case "addIngredient":
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            {
              ingredient: action.payload,
              number: state.ingredients.length,
            },
          ],
        };
      default:
        throw new Error();
    }
  };

  const intialState = {
    ingredients: [],
  };

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [ingredientsError, setIngredientsError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [state, dispatch] = useReducer(reducer, intialState);

  const uploadImage = () => {
    let file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  const submitRecipe = (data) => {
    const ingredients = [
      ...state.ingredients
        .filter((ingredientAndPortion) => {
          return ingredientAndPortion.ingredient !== "";
        })
        .map((ingr) => ingr.ingredient),
    ];
    if (ingredients.length < 1) {
      setIngredientsError(true);
      return;
    } else {
      setIngredientsError(false);
    }
    if (!imageUrl) {
      setImageError(true);
      return;
    } else {
      setImageError(false);
    }
    createRecipe(data, ingredients, image).then(() => {
      Router.push("/");
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitRecipe)} encType="multipart/form-data">
        <Title>
          <Controller
            as={
              <TextField
                label="Title"
                error={!!errors.title}
                helperText={errors.title ? "Title is missing" : null}
                fullWidth
                inputProps={{
                  style: {
                    fontSize: 25,
                    fontWeight: "bold",
                    color: theme.textColor,
                  },
                }}
                inputRef={register({
                  required: true,
                })}
              />
            }
            name="title"
            control={control}
          />
        </Title>

        <Row style={{ marginTop: "15px" }}>
          <NumberField>
            <NumberFieldTitle
              style={{
                color: theme.textColor,
              }}
            >
              Number of servings
            </NumberFieldTitle>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "10px", marginTop: "16px" }}>
                <PersonIcon fontSize="large" style={{ color: "#005c4c" }} />
              </div>

              <Controller
                as={
                  <TextField
                    style={{ width: "40px", whiteSpace: "nowrap" }}
                    name="portions"
                    type="number"
                    error={!!errors.portions}
                    helperText={errors.portions ? "Portions is missing" : null}
                    inputRef={register({
                      required: true,
                    })}
                  />
                }
                name="portions"
                control={control}
              />
              <p style={{ marginLeft: "15px" }}>portions</p>
            </div>
          </NumberField>
          <Separator />
          <NumberField>
            <NumberFieldTitle
              style={{ color: theme.textColor, marginRight: "70px" }}
            >
              Preparation Time
            </NumberFieldTitle>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "10px", marginTop: "9px" }}>
                <AccessTimeIcon fontSize="large" style={{ color: "#005c4c" }} />
              </div>
              <Controller
                as={
                  <TextField
                    type="number"
                    style={{ width: "60px", whiteSpace: "nowrap" }}
                    error={!!errors.time}
                    helperText={
                      errors.time ? "Please enter preparation time" : null
                    }
                    inputRef={register({
                      required: true,
                    })}
                  />
                }
                name="time"
                control={control}
              />
              <p style={{ marginLeft: "15px" }}>minutes</p>
            </div>
          </NumberField>
          <Separator />
          <NumberField>
            <NumberFieldTitle
              style={{ color: theme.textColor, marginRight: "95px" }}
            >
              Cooking Time
            </NumberFieldTitle>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "10px", marginTop: "9px" }}>
                <AccessTimeIcon fontSize="large" style={{ color: "#005c4c" }} />
              </div>
              <Controller
                as={
                  <TextField
                    type="number"
                    style={{ width: "60px", whiteSpace: "nowrap" }}
                    error={!!errors.cooktime}
                    helperText={
                      errors.cooktime ? "Cooking time is missing" : null
                    }
                    inputRef={register({
                      required: true,
                    })}
                  />
                }
                name="cooktime"
                control={control}
              />
              <p style={{ marginLeft: "15px" }}>minutes</p>
            </div>
          </NumberField>
        </Row>

        <PhotoRow>
          <PhotoContainer>
            <h3>Photo</h3>

            <RecipePhoto
              image={imageUrl}
              uploadImage={uploadImage}
              error={imageError}
            />
          </PhotoContainer>
          <Instructions>
            <h3>Instructions</h3>
            <Controller
              as={
                <Multiline
                  ref={register({ required: true })}
                  error={errors.instructions}
                />
              }
              name="instructions"
              control={control}
            />
            {errors.instructions ? (
              <p
                style={{
                  color: "#f44336",
                  fontSize: "0.75rem",
                  letterSpacing: "0.03em",
                  marginTop: "5px",
                }}
              >
                Instructions missing
              </p>
            ) : null}
          </Instructions>
        </PhotoRow>
        <Ingredients
          dispatch={dispatch}
          ingredients={state.ingredients}
          error={ingredientsError}
        />
        <div
          style={{ display: "flex", flexDirecton: "row", alignItems: "center" }}
        >
          <div
            style={{
              marginTop: "20px",
              marginRight: "20px",
              whiteSpace: "nowrap",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
            >
              Post recipe
            </Button>
          </div>
          {Object.keys(errors).length === 0 &&
          errors.constructor === Object &&
          !ingredientsError &&
          !imageError ? null : (
            <p style={{ color: "#f44336", marginTop: "30px" }}>
              Please take a look at the form, some fields are missing
            </p>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default withTheme(CreateRecipe);
