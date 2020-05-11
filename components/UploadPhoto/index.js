import React from "react";
import styled from "styled-components";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { makeStyles } from "@material-ui/core/styles";
import { breakpoints } from "../../shared/variables";

const RecipePhoto = (props) => {
  const classes = makeStyles(iconStyles)();

  return (
    <>
      {props.image ? (
        <label htmlFor="file-upload">
          <PreviewImage src={props.image} />
        </label>
      ) : (
        <Label htmlFor="file-upload" error={props.error}>
          {props.error
            ? "Please provide photo"
            : "Click here to upload a photo*"}
          <CameraAltIcon
            className={props.error ? classes.errorIcon : classes.successIcon}
          />
        </Label>
      )}
      <ImageInput
        id="file-upload"
        type="file"
        name="file"
        defaultValue=""
        onChange={props.uploadImage}
      />
    </>
  );
};

export default RecipePhoto;

function iconStyles() {
  return {
    successIcon: {
      fontSize: 90,
      color: "#006666",
    },
    errorIcon: {
      fontSize: 90,
      color: "#f44336",
    },
  };
}

const ImageInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  object-fit: cover;
  margin-bottom: 30px;
  @media (min-width: ${breakpoints.md}px) {
    margin-bottom: 0px;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b2d8d8;
  cursor: pointer;
  &:hover {
    background-color: #a8cccc;
  }
  height: 400px;
  width: 100%;
  min-width: 100%;
  border-radius: 5px;
  margin-bottom: 30px;
  @media (min-width: ${breakpoints.md}px) {
    margin-bottom: 0px;
    min-width: 450px;
    width: 450px;
  }
`;
