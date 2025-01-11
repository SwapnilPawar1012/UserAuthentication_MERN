import React, { useState } from "react";
import "../css/Authentication.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [privacyEye, setPrivacyEye] = useState("eye_solid");
  console.log("eye: ", privacyEye);
  const [passwordSecurity, setPasswordSecurity] = useState("password");
  console.log("passwordText: ", passwordSecurity);

  const HandlePrivacyEye = () => {
    setPasswordSecurity((prev) => (prev === "password" ? "text" : "password"));
    setPrivacyEye((prev) =>
      prev === "eye-solid" ? "eye-slash-solid" : "eye-solid"
    );
  };

  const [data, setData] = useState({ email: "", password: "" });
  console.log(data);

  const HandleUserData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/login", data)
        .then((response) => {
          console.log("Response: ", response);
          if (response.statusText === "OK") {
            sessionStorage.setItem("token", response.data.token); // set session using jwt token
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
    <div className="login-page">
      <div className="login-box">
        <h1 className="heading">Login</h1>
        <form onSubmit={(e) => HandleSubmit(e)}>
          <div className="input-group">
            <label className="input-group-text" htmlFor="email">
              <p>
                <img src="../assets/user-regular.svg" name="user" />
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

export default Login;
