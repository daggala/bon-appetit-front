import React, { useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
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
import { breakpoints, menuHeight } from "../shared/variables";
const HomeLink = styled.div`
  cursor: pointer;
`;

const MenuBar = styled.div`
  display: flex;
  height: ${menuHeight.phone}px;
  justify-content: space-between;
  @media (min-width: ${breakpoints.md}px) {
    height: ${menuHeight.desktop}px;
  }
`;

const RegisterButtons = styled.div`
  display: flex;
  margin-right: 20px;
  margin-top: 35px;
`;

const Logo = styled.img`
  width: 170px;
  margin-left: 25px;
  margin-top: 20px;

  @media (min-width: ${breakpoints.md}px) {
    width: 220px;
  }
`;

const HamburgerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #005c4c;
  border-radius: 5px;
  &:hover {
    background-color: #007c4c;
  }

  @media (min-width: ${breakpoints.xs}px) {
    margin-right: 10px;
    margin-top: 15px;
    width: 55px;
    height: 55px;
    svg {
      height: 1.4em;
      width: 1.4em;
    }
  }

  @media (min-width: ${breakpoints.sm}px) {
    margin-right: 25px;
    width: 40px;
    height: 40px;
    margin-top: 26px;
    svg {
      height: 1em;
      width: 14em;
    }
  }
  @media (min-width: ${breakpoints.md}px) {
    display: ${(props) => (props.user ? "flex" : "none")};
    margin-top: 37px;
  }
`;

const useStyles = makeStyles((theme) => ({
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
    color: "black",
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
    height: "23px",
    color: "black",
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
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      marginRight: "20px",
      marginTop: "30px",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      marginRight: "20px",
      marginTop: "37px",
    },
  },
  appBar: {
    backgroundColor: "white",
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
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

  return (
    <>
      <CssBaseline />
      <HideOnScroll threshold={650}>
        <AppBar className={classes.appBar}>
          <MenuBar>
            <HomeLink>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link href="/">
                  <Logo src="/../static/logo.png" />
                </Link>
              </Typography>
            </HomeLink>

            {/* <div className={classes.search}>
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
            </div> */}

            {isLoginDialogOpen ? (
              <Login onClickOutside={toggleLoginDialog} />
            ) : null}
            {isRegisterDialogOpen ? (
              <Register onClickOutside={toggleRegisterDialog} />
            ) : null}

            <div style={{ display: "flex", flexDirection: "row" }}>
              {user ? (
                <RegisterButtons className={classes.registerButtons}>
                  <div style={{ marginRight: "10px" }}>
                    <ColorButton
                      variant="contained"
                      color="primary"
                      onClick={toggleLoginDialog}
                    >
                      Create Recipe
                    </ColorButton>
                  </div>
                  <ColorButton
                    variant="contained"
                    color="primary"
                    onClick={toggleRegisterDialog}
                  >
                    My recipes
                  </ColorButton>
                </RegisterButtons>
              ) : (
                <RegisterButtons className={classes.registerButtons}>
                  <div style={{ marginRight: "10px" }}>
                    <ColorButton
                      variant="contained"
                      color="primary"
                      onClick={toggleLoginDialog}
                    >
                      Login
                    </ColorButton>
                  </div>
                  <ColorButton
                    variant="contained"
                    color="primary"
                    onClick={toggleRegisterDialog}
                  >
                    Register
                  </ColorButton>
                </RegisterButtons>
              )}

              <HamburgerButton
                aria-label="open drawer"
                onClick={handleProfileMenuOpen}
                user={user}
              >
                <MenuIcon fontSize="large" />
              </HamburgerButton>
            </div>
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
