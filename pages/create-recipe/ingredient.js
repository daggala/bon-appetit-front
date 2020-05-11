import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const Ingredient = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderColor: theme.palette.primary.main,
    borderWidth: "1px",
    borderStyle: "solid",
    margin: "5px",
    "&:hover": {
      borderColor: theme.palette.primary.dark,

      "& .MuiSvgIcon-root , & .MuiChip-deleteIcon": {
        color: theme.palette.primary.dark,
      },
    },
    "& .MuiSvgIcon-root , & .MuiChip-deleteIcon": {
      color: theme.palette.primary.main,
    },
  },
}))(Chip);

export default Ingredient;
