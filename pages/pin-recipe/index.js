import React, { useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import { createRecipe } from "../../services/createRecipe";
import useForm from "../../hooks/useForm";
import validateForm from "./validateForm";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import RecipePhoto from "../../components/UploadPhoto";
import { menuHeight, breakpoints } from "../../shared/variables";

export default function CreateRecipe() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    submitRecipe,
    validateForm
  );

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [imageError, setImageError] = useState();

  const uploadImage = () => {
    let file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  function submitRecipe(data) {
    if (!imageUrl) {
      setImageError(true);
      return;
    }

    const formValues = {
      ...data,
      file: image,
    };

    createRecipe(formValues).then(() => {
      Router.push("/");
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Layout>
          <Column>
            <RecipePhoto
              error={imageError}
              image={imageUrl}
              uploadImage={uploadImage}
            />
          </Column>
          <Column>
            <TextField
              name="title"
              label="Title"
              value={values.title || ""}
              onChange={handleChange}
              style={{ marginBottom: "25px" }}
              error={!!errors.title}
              helperText={errors.title}
              required
              autoFocus
            />
            <TextField
              name="url"
              label="Url"
              value={values.url || ""}
              onChange={handleChange}
              error={!!errors.url}
              helperText={errors.url}
              fullWidth
              required
            />
            <div style={{ marginTop: "50px" }}>
              <Button
                onClick={handleSubmit}
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
}

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
