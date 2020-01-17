import React from "react";
import Banner from "./banner";

const Layout = props => {
  return (
    <>
      <Banner />
      {props.children}
    </>
  );
};

export default Layout;
