import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { createRecipe } from "../../actions/createRecipe";
import RecipePhoto from "../../components/recipe-photo";
import { useForm, Controller } from "react-hook-form";
import { menuHeight, breakpoints } from "../../shared/variables";
import Router from "next/router";

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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm + 150}px) {
    flex-direction: row;
  }
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 30px;
`;

const Box = styled.div`
  display: flex;
`;

const CreateRecipe = () => {
  const { control, handleSubmit, register, errors } = useForm();

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [imageError, setImageError] = useState();

  const uploadImage = () => {
    let file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  function submitForm(data) {
    if (!imageUrl) {
      setImageError(true);
      return;
    }
    createRecipe(data, null, image).then(() => {
      Router.push("/");
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
        <Layout>
          <Column>
            <RecipePhoto
              error={imageError}
              image={imageUrl}
              uploadImage={uploadImage}
            />
          </Column>
          <Column>
            <Controller
              as={
                <TextField
                  style={{ width: "100%", marginBottom: "25px" }}
                  error={errors.title}
                  id="standard-error-helper-text"
                  label="Title"
                  inputRef={register({
                    required: true,
                  })}
                  helperText={errors.title ? "Title is missing" : null}
                />
              }
              name="title"
              control={control}
              defaultValue=""
            />

            <Controller
              as={
                <TextField
                  id="standard-required"
                  error={errors.url}
                  label="Url"
                  inputRef={register({ required: true })}
                  helperText={
                    errors.title ? "Please provide URL to the recipe" : null
                  }
                />
              }
              name="url"
              control={control}
              defaultValue=""
            />

            <div style={{ marginTop: "50px" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
              >
                Post recipe
              </Button>
            </div>
          </Column>
        </Layout>
      </Form>
    </Container>
  );
};

export default CreateRecipe;
