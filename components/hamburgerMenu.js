import React from "react";
import Link from "next/link";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="simple-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <div>
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
              <p>Pin recipe</p>
            </MenuItem>
          </Link>
        </div>
      ) : (
        <div>
          <MenuItem
            onClick={() => {
              openLoginDialog(true);
              handleMenuClose();
            }}
          >
            <p>Login</p>
          </MenuItem>

          <MenuItem
            onClick={() => {
              openRegisterDialog(true);
              handleMenuClose();
            }}
          >
            <p>Register</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log("not yet implemented");
            }}
          >
            <p>Search</p>
          </MenuItem>
        </div>
      )}
    </Menu>
  );
};

export default HamburgerMenu;
