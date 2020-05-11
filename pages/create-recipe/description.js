import React from "react";
import styled from "styled-components";
import { breakpoints } from "../../shared/variables";

const Description = ({ errors, values, handleChange }) => {
  return (
    <Container>
      <h3>Instructions</h3>
      <MultilineInput
        name="description"
        value={values.description || ""}
        onChange={handleChange}
        error={!!errors.description}
        required
      />

      {errors.description ? (
        <ErrorMessage>{errors.description}</ErrorMessage>
      ) : null}
    </Container>
  );
};

export default Description;

const Container = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: ${breakpoints.md}px) {
    margin-left: 30px;
  }
`;

const MultilineInput = styled.textarea`
  width: 100%;
  margin-left: 0px;
  border-width: 1px;
  outline: none;
  padding: 20px;
  font-size: 16px;
  font-family: Roboto;
  vertical-align: top;
  border-radius: 5px;
  background-color: #fafafa;
  border-color: ${(props) => (props.error ? "#f44336" : "rgba(0, 0, 0, 0.23)")};
  &:focus {
    border-color: #006666;
  }
  height: 300px;
  @media (min-width: ${breakpoints.md}px) {
    height: 88%;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.palette.primary.error};
  font-size: 0.75rem;
  letter-spacing: 0.03em;
  margin-top: 5px;
`;
