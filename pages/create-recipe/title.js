import React from "react";
import styled, { withTheme } from "styled-components";
import TextField from "@material-ui/core/TextField";

const Title = ({ theme, errors, values, onChange }) => {
  return (
    <Container>
      <TextField
        name="title"
        label="Title"
        value={values.title || ""}
        error={errors.title ? true : false}
        helperText={errors.title}
        onChange={onChange}
        inputProps={{
          style: {
            fontSize: 25,
            fontWeight: "bold",
            color: theme.textColor,
          },
        }}
        required
        fullWidth
        autoFocus
      />
    </Container>
  );
};

export default withTheme(Title);

const Container = styled.div`
  margin-bottom: 20px;
`;
