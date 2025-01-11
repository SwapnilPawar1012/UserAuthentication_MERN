import React, { useState } from "react";
import "../css/Authentication.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [privacyEye, setPrivacyEye] = useState("eye_solid");
  const [passwordSecurity, setPasswordSecurity] = useState("password");

  const HandlePrivacyEye = () => {
    setPasswordSecurity((prev) => (prev === "password" ? "text" : "password"));
    setPrivacyEye((prev) =>
      prev === "eye-solid" ? "eye-slash-solid" : "eye-solid"
    );
  };

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const HandleUserData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field using name
    }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios
        .post("http://localhost:5000/signup", data)
        .then((response) => {
          if (response.statusText === "OK") {
            sessionStorage.setItem("token", response.data.token); // set session using jwt token
            alert(response.data.description);
            navigate("/home", { state: { callFunction: true } });
          } else {
            alert(response.data.description);
          }
        })
        .catch((error) => {
          alert("Something wrong! Please try again.");
        });
    } catch (error) {
      alert("Something wrong! Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h1 className="heading">Sign Up</h1>
        <form onSubmit={(e) => HandleSubmit(e)}>
          <div className="input-group">
            <label className="input-group-text" htmlFor="username">
              <p>
                <img src="../assets/user-regular.svg" name="user" />
              </p>
              <p>Username</p>
            </label>
            <input
              type="text"
              name="username"
              value={data.username}
              placeholder="username"
              onChange={(e) => HandleUserData(e)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-group-text" htmlFor="email">
              <p>
                <img src="../assets/envelope-regular.svg" name="envelope" />
              </p>
              <p>Email</p>
            </label>
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="email"
              onChange={(e) => HandleUserData(e)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-group-text" htmlFor="password">
              <p>
                <img src="../assets/lock-solid.svg" name="lock" />
              </p>
              <p>Password</p>
            </label>
            <input
              type={`${passwordSecurity}`}
              name="password"
              value={data.password}
              placeholder="password"
              onChange={(e) => HandleUserData(e)}
              required
            />
            <img
              src={`../assets/${privacyEye}.svg`}
              className="privacy-eye"
              name={privacyEye}
              onClick={HandlePrivacyEye}
            />
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
