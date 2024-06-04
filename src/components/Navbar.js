import React from "react";
import "./Navbar.css";
import logo from "../images/logo-rect.png";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="GRC Wharton" className="logo" />
      </div>
      <div className="navbar-right">
        <a href="#upload" className="navbar-link">
          Upload
        </a>
        <a href="#downlaod" className="navbar-link">
          Download
        </a>
        <button className="apply-button">Quiz</button>
      </div>
    </nav>
  );
};

export default Navbar;
