import React from "react";
import styled from "styled-components";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { makeStyles } from "@material-ui/core/styles";

const ImageInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 500px;
  object-fit: cover;
  margin-right: 30px;
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
  min-width: 450px;
  width: 450px;
  margin-right: 30px;
  border-radius: 5px;
`;
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
const RecipePhoto = React.forwardRef((props, ref) => {
  const classes = makeStyles(iconStyles)();

  return (
    <>
      {props.image ? (
        <label htmlFor="file-upload">
          <PreviewImage src={props.image} ref={photoRef} />
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
        ref={ref}
        id="file-upload"
        type="file"
        name="file"
        defaultValue=""
        onChange={props.uploadImage}
      />
    </>
  );
});

export default RecipePhoto;
