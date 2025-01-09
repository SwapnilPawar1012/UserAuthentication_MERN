import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <p className="background-img"></p>
      <div className="auth">
        <Link to="/signup" className="link">
          <p className="signup-btn">Signup</p>
        </Link>
        <Link to="/login" className="link">
          <p className="login-btn">Login</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
