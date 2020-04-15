import React, { useReducer, useState } from "react";
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

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: ${menuHeight.phone + 30}px 10px 50px 10px;
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
  max-width: 700px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}px) {
    flex-direction: row;
  }
`;

const PhotoRow = styled(Row)`
  margin-top: 30px;
`;

const Portions = styled.div``;

const Time = styled.div`
  margin-bottom: 25px;
  @media (min-width: ${breakpoints.md}px) {
    margin-left: 50px;
  }
`;

const Instructions = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const Separator = styled.div`
  width: 1px;
  background-color: #005c4c;
  opacity: 0.5;
  margin-left: 60px;
  height: 80%;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-family: Roboto;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Multiline = styled.textarea`
  width: 100%;
  min-height: 300px;
  height: 90%;
  border-width: 1px;
  margin-top: 20px;
  outline: none;
  padding: 20px;
  font-size: 16px;
  font-family: Roboto;
  vertical-align: top;
  border-radius: 5px;
  background-color: #fafafa;
  border-color: ${(props) => (props.error ? "#f44336" : "rgba(0, 0, 0, 0.23)")};
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
  const [imageUrl, setImageUrl] = useState();
  const [imageError, setImageError] = useState();

  const [state, dispatch] = useReducer(reducer, intialState);

  const uploadImage = () => {
    let file = event.target.files[0];
    console.log("file ", file);
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  const submitRecipe = (data) => {
    const ingredients = {
      ...state,
      ingredients: state.ingredients
        .filter((ingredientAndPortion) => {
          return ingredientAndPortion.ingredient !== "";
        })
        .map((ingr) => ingr.ingredient),
    };
    console.log("data ", data);
    console.log("image ", image);
    console.log("ingredients ", ingredients);
    if (!imageUrl) {
      setImageError(true);
      return;
    }
    createRecipe(data, ingredients, image);
  };

  console.log("errors ", errors);
  return (
    <Container>
      <Form onSubmit={handleSubmit(submitRecipe)} encType="multipart/form-data">
        <Title>
          <Controller
            as={
              <TextField
                id="standard-error-helper-text"
                label="Title"
                error={!!errors.title}
                helperText={errors.title ? "Title is missing" : null}
                placeholder="example: Hot Tomato Soup with Basil Leaves"
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
          <Portions>
            <h3
              style={{
                color: theme.textColor,
              }}
            >
              Number of servings
            </h3>

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
                    id="standard-error-helper-text"
                    style={{ width: "20px", whiteSpace: "nowrap" }}
                    name="portions"
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
          </Portions>
          <Separator />
          <Time>
            <h3 style={{ color: theme.textColor }}>Preparation Time</h3>
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
                    style={{ width: "40px", whiteSpace: "nowrap" }}
                    error={!!errors.time}
                    helperText={
                      errors.time ? "Preparation time is missing" : null
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
          </Time>
          <Separator />
          <Time>
            <h3 style={{ color: theme.textColor }}>Cooking Time</h3>
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
                    style={{ width: "40px", whiteSpace: "nowrap" }}
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
          </Time>
        </Row>

        <PhotoRow>
          <PhotoContainer>
            <h3>Photo</h3>
            <Controller
              as={
                <RecipePhoto
                  image={imageUrl}
                  uploadImage={uploadImage}
                  error={errors.file}
                  ref={register({
                    required: true,
                  })}
                />
              }
              name="file"
              control={control}
            />
          </PhotoContainer>
          <Instructions>
            <Label>Instructions</Label>
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
        <Ingredients dispatch={dispatch} ingredients={state.ingredients} />

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
