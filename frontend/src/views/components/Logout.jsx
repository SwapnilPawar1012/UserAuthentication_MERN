import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/home");
  }, []);
  return <></>;
}

export default Logout;
