import React from 'react';
import styled from 'styled-components';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const ImageInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  max-width: 400px;
  max-height: 300px;
  width: 100%;
  object-fit: cover;
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
`;

const RecipePhoto = ({ image, uploadImage }) => {
  return (
    <>
      {image ? (
        <label htmlFor="file-upload">
          <PreviewImage src={image} />
        </label>
      ) : (
        <Label htmlFor="file-upload">
          Click here to upload a photo
          <CameraAltIcon style={{ fontSize: 90, color: '#006666' }} />
        </Label>
      )}

      <ImageInput
        id="file-upload"
        type="file"
        name="file"
        onChange={uploadImage}
      />
    </>
  );
};

export default RecipePhoto;
