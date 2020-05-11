import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const AddRoundButton = ({ onClick, value, theme }) => {
  const [isButtonHovered, setButtonHover] = useState(false);

  return (
    <AddButton type="button" onClick={onClick} disabled={!value}>
      {isButtonHovered ? (
        <AddCircleIcon
          style={{ fontSize: 40, color: theme.palette.primary.main }}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
        />
      ) : (
        <AddCircleOutlineIcon
          style={{ fontSize: 40, color: theme.palette.primary.main }}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
        />
      )}
    </AddButton>
  );
};

export default withTheme(AddRoundButton);

const AddButton = styled.button`
  background-color: transparent;
  border: none;
  padding: none;
  cursor: pointer;
`;
