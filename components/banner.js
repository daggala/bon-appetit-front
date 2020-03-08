import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import { UserContext } from '../utils/context';
import Login from './login.js';
import Register from './register.js';
import ColorButton from './buttons/colorButton';
import { isJsonString } from '../utils/isJsonString';
import styled from 'styled-components';

const HomeLink = styled.div`
  cursor: pointer;
`;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    textDecoration: 'none',
    color: 'white',
    '&:visited': {
      color: 'white',
      textDecoration: 'none'
    },

    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
         <Link href="/profile">
      <MenuItem onClick={handleMenuClose}>
          <p>Profile</p>
      </MenuItem>
      </Link>
      <Link href="/create-recipe">
      <MenuItem onClick={handleMenuClose}>
          <p>Create my own recipe</p>  
      </MenuItem>
      </Link>
      <Link href="/pin-recipe">
      <MenuItem onClick={handleMenuClose}>
          <p>Pin a recipe</p>
      </MenuItem>
      </Link>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <HomeLink>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/">
              <p>Bon Appetit</p>
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
              inputProps={{ 'aria-label': 'search' }}
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
            <div style={{ display: 'flex', marginRight: '20px' }}>
              <div style={{ marginRight: '10px' }}>
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
            </div>
          )}
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
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default Banner;
