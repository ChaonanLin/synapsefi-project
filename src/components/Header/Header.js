import React from "react";
import Logo from "../.././asset/Logo.png"
import "./Header.css";

const Header = props => {
  return (
    <div className="header-container">
      <div className="header-logo-container">
        <img
          className="header-logo-img"
          src={Logo}
          alt="logo"
        />
      </div>
      <div className="header-close-container" />
    </div>
  );
};

export default Header;
