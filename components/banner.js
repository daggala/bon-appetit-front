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
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";

const HomeLink = styled.div`
  cursor: pointer;
`;

const MenuBar = styled.div`
  display: flex;
  height: 120px;
  justify-content: space-between;
`;

const RegisterButtons = styled.div`
  display: flex;
  margin-right: 20px;
  margin-top: 35px;
`;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2.5),
    height: "60px",
    marginLeft: "20px",
    marginTop: "15px",
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    color: "black",
  },
  title: {
    textDecoration: "none",
    color: "white",
    "&:visited": {
      color: "white",
      textDecoration: "none",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: "30px",
    marginLeft: "30px",
    marginTop: "37px",
    width: "100%",
    height: "40px",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    display: "flex",
  },
  inputInput: {
    padding: theme.spacing(1.3, 1, 1, 7),
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.35),
    },
    borderRadius: theme.shape.borderRadius,
  },
  registerButtons: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      marginRight: "20px",
      marginTop: "35px",
    },
  },
  appBar: {
    backgroundColor: "white",
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Banner = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoginDialogOpen, toggleLoginDialog] = React.useState(false);
  const [isRegisterDialogOpen, toggleRegisterDialog] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log("isLoginDialogOpen ", isLoginDialogOpen);

  return (
    <>
      <CssBaseline />
      <HideOnScroll threshold={650}>
        <AppBar className={classes.appBar}>
          <MenuBar>
            <HomeLink>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link href="/">
                  <img
                    style={{
                      width: "220px",
                      marginLeft: "25px",
                      marginTop: "20px",
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
                  input: classes.inputInput,
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

            {user ? null : (
              <RegisterButtons className={classes.registerButtons}>
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
              </RegisterButtons>
            )}

            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleProfileMenuOpen}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <HamburgerMenu
              anchorEl={anchorEl}
              isMenuOpen={isMenuOpen}
              handleMenuClose={handleMenuClose}
              user={user}
              openLoginDialog={toggleLoginDialog}
              openRegisterDialog={toggleRegisterDialog}
            />
          </MenuBar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Banner;
