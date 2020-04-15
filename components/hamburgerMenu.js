import React from "react";
import Link from "next/link";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    height: "35px",
  },
}))(MenuItem);

const HamburgerMenu = ({
  anchorEl,
  user,
  openLoginDialog,
  openRegisterDialog,
  isMenuOpen,
  handleMenuClose,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id="simple-menu"
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <div>
          <Link href="/profile">
            <StyledMenuItem onClick={handleMenuClose}>
              <p>Profile</p>
            </StyledMenuItem>
          </Link>
          <Link href="/create-recipe">
            <StyledMenuItem onClick={handleMenuClose}>
              <p>Create my own recipe</p>
            </StyledMenuItem>
          </Link>
          <Link href="/pin-recipe">
            <StyledMenuItem onClick={handleMenuClose}>
              <p>Pin recipe</p>
            </StyledMenuItem>
          </Link>
          <Link
            href={{ pathname: "/my-recipes/[id]" }}
            as={`/my-recipes/${user.id}`}
          >
            <StyledMenuItem onClick={handleMenuClose}>
              <p>My Recipes</p>
            </StyledMenuItem>
          </Link>
        </div>
      ) : (
        <div>
          <StyledMenuItem
            onClick={() => {
              openLoginDialog(true);
              handleMenuClose();
            }}
          >
            <p>Login</p>
          </StyledMenuItem>

          <StyledMenuItem
            onClick={() => {
              openRegisterDialog(true);
              handleMenuClose();
            }}
          >
            <p>Register</p>
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => {
              console.log("not yet implemented");
            }}
          >
            <p>Search</p>
          </StyledMenuItem>
        </div>
      )}
    </Menu>
  );
};

export default HamburgerMenu;
