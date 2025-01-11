import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { useAppContext } from "./context/ContextProvider.jsx";

function Home() {
  const { isLogged, HandleAuthenticate } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.callFunction) {
      HandleAuthenticate();
    }
  }, [location.state]);

  return (
    <>
      {isLogged ? (
        <div className="home">
          <p
            className="background-img
          "
          ></p>
          <div className="content">
            <Navbar />
            Login successful
          </div>
        </div>
      ) : (
        <div className="home">
          <p className="background-img"></p>
          <div className="auth-content">
            <Link to="/signup" className="link">
              <p className="signup-btn">Signup</p>
            </Link>
            <Link to="/login" className="link">
              <p className="login-btn">Login</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
