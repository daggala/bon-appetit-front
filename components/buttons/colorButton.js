import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.primary.darker,
    },

    [theme.breakpoints.up("sm")]: {
      height: "35px",
    },
    [theme.breakpoints.up("md")]: {
      height: "40px",
    },
  },
}))(Button);

export default ColorButton;
