import React from "react";
import Navbar from "../Navbar";

interface Links {
  name: string;
  path: string;
}

const Header = () => {
  const links: Links[] = [
    { name: "HOME", path: "/" },
    { name: "SEARCH", path: "/" },
  ];

  return <Navbar links={links} />;
};

export default Header;
