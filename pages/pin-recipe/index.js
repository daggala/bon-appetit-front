import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { createRecipe } from '../../actions/createRecipe';
import RecipePhoto from '../../components/recipe-photo';
import { useForm, Controller } from 'react-hook-form';

const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: 50px 10px;
`;

const Layout = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(7, 1fr);
  max-width: 900px;
  min-width: 100px;
`;

const Box = styled.div`
  display: grid;
  grid-row: ${props => (props.image ? 'span 4' : null)};
`;

const CreateRecipe = () => {
  const { control, handleSubmit, register, errors } = useForm();

  const [imageUrl, setImageUrl] = useState();

  const uploadImage = e => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(createRecipe)} encType="multipart/form-data">
        <Layout>
          <Box>
            <Controller
              as={
                <TextField
                  error={errors.title}
                  id="standard-error-helper-text"
                  label="Title"
                  inputRef={register({
                    required: true
                  })}
                  helperText={errors.title ? 'Title is missing' : null}
                />
              }
              name="title"
              control={control}
              defaultValue=""
            />
          </Box>

          <Box image>
            <RecipePhoto
              error={errors.file}
              ref={register({ required: true })}
              image={imageUrl}
              uploadImage={uploadImage}
            />
          </Box>
          <Box>
            <Controller
              as={
                <TextField
                  id="standard-required"
                  error={errors.url}
                  label="Url"
                  inputRef={register({ required: true })}
                  helperText={
                    errors.title ? 'Please provide URL to the recipe' : null
                  }
                />
              }
              name="url"
              control={control}
              defaultValue=""
            />
          </Box>
          <div style={{ marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
            >
              Submit recipe
            </Button>
          </div>
        </Layout>
      </form>
    </Container>
  );
};

export default CreateRecipe;
