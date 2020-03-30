import React, { useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import { UserContext } from "../utils/context";
import Login from "./login.js";
import Register from "./register.js";
import ColorButton from "./buttons/colorButton";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import HamburgerMenu from "./hamburgerMenu";

const HomeLink = styled.div`
  cursor: pointer;
`;

const MenuBar = styled.div`
  display: flex;
  height: 120px;
`;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    textDecoration: "none",
    color: "white",
    "&:visited": {
      color: "white",
      textDecoration: "none"
    },
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop: "38px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    },
    height: "40px"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

const Banner = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoginDialogOpen, toggleLoginDialog] = React.useState(false);
  const [isRegisterDialogOpen, toggleRegisterDialog] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <>
      <MenuBar>
        <HomeLink>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/">
              <img
                style={{
                  width: "220px",
                  marginLeft: "25px",
                  marginTop: "20px"
                }}
                src="/../static/logo.png"
              />
            </Link>
          </Typography>
        </HomeLink>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        {isLoginDialogOpen ? (
          <Login onClickOutside={toggleLoginDialog} />
        ) : null}
        {isRegisterDialogOpen ? (
          <Register onClickOutside={toggleRegisterDialog} />
        ) : null}

        <div className={classes.grow} />
        {user ? null : (
          <div
            style={{ display: "flex", marginRight: "20px", marginTop: "37px" }}
          >
            <div style={{ marginRight: "10px" }}>
              <ColorButton
                variant="contained"
                color="primary"
                onClick={toggleLoginDialog}
                style={{ height: "40px" }}
              >
                Login
              </ColorButton>
            </div>
            <ColorButton
              variant="contained"
              color="primary"
              onClick={toggleRegisterDialog}
              style={{ height: "40px" }}
            >
              Register
            </ColorButton>
          </div>
        )}
        {user ? (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        ) : null}
      </MenuBar>

      <HamburgerMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
      />
    </>
  );
};

export default Banner;
