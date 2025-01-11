import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import Logout from "./Logout";

function Navbar() {
  const HandleLoggedOut = () => {
    let confirm = window.confirm("Are you sure you want to log out?");
    if (confirm) {
      <Logout />;
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <img src="../../assets/logo.gif" alt="logo" />
        <h1>ChatApp</h1>
      </div>
      <div className="right">
        <Link to="/logout" onClick={HandleLoggedOut}>
          <button className="logout-btn">Logout</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
