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
  background-color: ${props => (props.error ? 'red' : '#b2d8d8')};
  cursor: pointer;
  &:hover {
    background-color: #a8cccc;
  }
`;

const RecipePhoto = React.forwardRef((props, ref) => {
  return (
    <>
      {props.image ? (
        <label htmlFor="file-upload">
          <PreviewImage src={props.image} />
        </label>
      ) : (
        <Label htmlFor="file-upload" error={props.error}>
          {props.error
            ? 'Please provide photo!'
            : 'Click here to upload a photo'}
          <CameraAltIcon style={{ fontSize: 90, color: '#006666' }} />
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
