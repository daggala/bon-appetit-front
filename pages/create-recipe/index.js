import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../utils/context";
import { createRecipe } from "../../services/createRecipe";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import { menuHeight, breakpoints } from "../../shared/variables";

import Router from "next/router";
import useForm from "../../shared/hooks/useForm";
import validateForm from "./validateForm";
import Title from "./title";
import Time from "./time";
import RecipePhoto from "../../components/UploadPhoto";
import Description from "./description";
import Ingredients from "./ingredients.js";

const CreateRecipe = () => {
  const { user } = useContext(UserContext);

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [ingredientsError, setIngredientsError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  //TODO: Could use useReducer here
  function removeIngredient(indexToRemove) {
    const modifiedList = ingredients.filter(
      (_, index) => index !== indexToRemove
    );
    setIngredients(modifiedList);
  }

  function addIngredient(i) {
    setIngredients([...ingredients, i]);
  }

  const uploadImage = () => {
    let file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  const submitRecipe = (data) => {
    console.log(state.ingredients);
    if (state.ingredients.length < 1) {
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

    const values = {
      ...data,
      ingredients: ingredients,
      file: image,
      authorId: user.id,
    };
    createRecipe(values).then(() => {
      Router.push("/");
    });
  };
  const { values, errors, handleChange, handleSubmit } = useForm(
    submitRecipe,
    validateForm
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Title errors={errors} values={values} onChange={handleChange} />
        <Time errors={errors} values={values} handleChange={handleChange} />

        <PhotoRow>
          <PhotoContainer>
            <h3>Photo</h3>

            <RecipePhoto
              image={imageUrl}
              uploadImage={uploadImage}
              error={imageError}
            />
          </PhotoContainer>
          <Description
            errors={errors}
            values={values}
            handleChange={handleChange}
          />
        </PhotoRow>
        <Ingredients
          removeItem={removeIngredient}
          addItem={addIngredient}
          ingredients={ingredients}
          error={ingredientsError}
        />
        <div
          style={{ display: "flex", flexDirecton: "row", alignItems: "center" }}
        >
          <ButtonContainer>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              endIcon={<Icon>send</Icon>}
            >
              Post recipe
            </Button>
          </ButtonContainer>

          {Object.keys(errors).length === 0 &&
          errors.constructor === Object &&
          !ingredientsError &&
          !imageError ? null : (
            <ErrorMessage>
              Please take a look at the form, some fields are missing
            </ErrorMessage>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default CreateRecipe;

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

const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-right: 20px,
  white-space: nowrap,
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.palette.primary.error};
  margin-top: 30px;
  margin-left: 30px;
`;
