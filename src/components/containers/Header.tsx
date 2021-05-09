import React from "react";
import Navbar from "../Navbar";

interface Links {
  name: string;
  path: string;
}

const Header = () => {
  const links: Links[] = [
    { name: "home", path: "/" },
    { name: "about", path: "/" },
    { name: "contact", path: "/" },
  ];

  return <Navbar links={links} />;
};

export default Header;
