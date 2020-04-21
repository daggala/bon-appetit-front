import React, { useContext } from "react";
import { UserContext } from "../utils/context";

import Link from "next/link";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
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
  const { logoutUser } = useContext(UserContext);

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
          <StyledMenuItem
            onClick={() => {
              logoutUser();
              handleMenuClose();
            }}
          >
            <p>Logout</p>
          </StyledMenuItem>
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
        </div>
      )}
    </Menu>
  );
};

export default HamburgerMenu;
