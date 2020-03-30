import React from "react";
import Link from "next/link";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const HamburgerMenu = ({ anchorEl, isMenuOpen, handleMenuClose }) => {
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
    </Menu>
  );
};

export default HamburgerMenu;
