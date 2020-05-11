import React from "react";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";
import { breakpoints } from "../../shared/variables";
import styled, { withTheme } from "styled-components";

import AccessTimeIcon from "@material-ui/icons/AccessTime";

const Time = ({ theme, values, handleChange, errors }) => {
  return (
    <Container>
      <NumberField>
        <NumberFieldTitle>Number of servings</NumberFieldTitle>
        <Row>
          <div style={{ marginRight: "10px", marginTop: "5px" }}>
            <PersonIcon
              fontSize="large"
              style={{ color: theme.palette.primary.main }}
            />
          </div>
          <TextField
            style={{ width: "40px", whiteSpace: "nowrap" }}
            name="servings"
            value={values.servings || undefined}
            type="number"
            error={!!errors.servings}
            helperText={errors.servings}
            onChange={handleChange}
            required
          />
          <Unit>portions</Unit>
        </Row>
      </NumberField>

      <Separator />

      <NumberField>
        <NumberFieldTitle style={{ marginRight: "70px" }}>
          Preparation Time
        </NumberFieldTitle>
        <Row>
          <div style={{ marginRight: "10px", marginTop: "5px" }}>
            <AccessTimeIcon
              fontSize="large"
              style={{ color: theme.palette.primary.main }}
            />
          </div>
          <TextField
            name="prepTime"
            value={values.prepTime || undefined}
            type="number"
            style={{ width: "60px", whiteSpace: "nowrap" }}
            error={!!errors.prepTime}
            helperText={errors.prepTime}
            onChange={handleChange}
            required
          />
          <Unit>minutes</Unit>
        </Row>
      </NumberField>

      <Separator />

      <NumberField>
        <NumberFieldTitle style={{ marginRight: "95px" }}>
          Cooking Time
        </NumberFieldTitle>
        <Row>
          <div style={{ marginRight: "10px", marginTop: "5px" }}>
            <AccessTimeIcon
              fontSize="large"
              style={{ color: theme.palette.primary.main }}
            />
          </div>

          <TextField
            name="cookTime"
            value={values.cookTime || undefined}
            type="number"
            style={{ width: "60px", whiteSpace: "nowrap" }}
            error={!!errors.cookTime}
            helperText={errors.cookTime}
            onChange={handleChange}
            required
          />

          <Unit>minutes</Unit>
        </Row>
      </NumberField>
    </Container>
  );
};

export default withTheme(Time);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 15px;
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
    max-width: 900px:
    justify-content: space-between;
  
  }
`;

const NumberField = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
  color: ${({ theme }) => theme && theme.textColor};
  @media (min-width: ${breakpoints.xs}px) {
    flex-direction: column;
  }
  @media (min-width: ${breakpoints.sm}px) {
    flex-direction: row;
  }
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: column;
  }
`;

const NumberFieldTitle = styled.h3`
  margin-right: 50px;
`;

const Separator = styled.div`
  width: 1px;
  background-color: #005c4c;
  opacity: 0.5;
  margin-left: 60px;
  margin-right: 60px;
  margin-top: 10px;
`;

const Unit = styled.p`
  margin-left: 15px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  alignitems: center;
`;
