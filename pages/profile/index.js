import React, { useContext, useState, useReducer } from 'react';
import { UserContext } from '../../utils/context';
import styled, { withTheme } from 'styled-components';
import TextField from '@material-ui/core/TextField';
import RecipePhoto from '../../components/recipe-photo';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

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

const Form = styled.form`
  display: grid;
`;

const Separator = styled.div`
  display: flex;
  /* grid-auto-rows: 1;*/
  grid-column: span 2;
  align-items: center;
  text-align: center;
  color: ${props => props.theme.colors[4]};
  &::before {
    content: '';
    flex: 1;
    border-bottom: 3px solid #a8cccc;
    margin-right: 0.5em;
  }

  &::after {
    content: '';
    flex: 1;
    border-bottom: 3px solid #a8cccc;
    margin-left: 0.5em;
  }
`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const Profile = props => {
  const { logoutUser } = useContext(UserContext);
  const classes = useStyles();
  const initialState = {
    firstName: '',
    lastName: ''
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeFirstName':
        return { ...state, firstName: action.payload };
      case 'changeLastName':
        return { ...state, lastName: action.payload };
      case 'firstPassword':
        return { ...state, firstPassword: action.payload };
      case 'secondPassword':
        //compare with first password
        return { ...state, secondPassword: action.payload };
    }
  };

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeImage = e => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  const submitForm = () => {
    console.log('image ', image, 'state, ', state);
    return;
  };

  return (
    <Container>
      <Form onSubmit={submitForm} encType="multipart/form-data">
        <Layout>
          <Separator>Profile</Separator>

          <TextField
            id="standard-required"
            label="First name"
            onChange={e => dispatch({ type: 'changeFirstName', payload: e })}
          />
          <Box image>
            <RecipePhoto image={imageUrl} uploadImage={changeImage} />
          </Box>
          <TextField
            id="standard-required"
            label="Last name"
            onChange={e => dispatch({ type: 'changeLastName', payload: e })}
          />
          <TextField
            id="standard-required"
            label="Email address"
            onChange={e => dispatch({ type: 'changeEmail', payload: e })}
          />
          <TextField
            id="standard-required"
            label="Display name"
            onChange={e => dispatch({ type: 'changeDisplayName', payload: e })}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save changes
          </Button>
          <Separator>Change password</Separator>
          <TextField
            id="standard-required"
            label="Password"
            type="password"
            onChange={e =>
              dispatch({ type: 'changeFirstPassword', payload: e })
            }
          />
          <TextField
            id="standard-required"
            label="Password "
            type="password"
            onChange={e => dispatch({ type: 'changeLastPassword', payload: e })}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Update password
          </Button>
          <div></div>
          <Separator>Log out</Separator>

          <Button variant="contained" color="primary" onClick={logoutUser}>
            Logout
          </Button>
        </Layout>
      </Form>
    </Container>
  );
};

export default withTheme(Profile);
