import React, { useState } from "react";
import axios from "axios";

function Login() {
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
        .then((response) => console.log("Response: ", response))
        .catch((error) => console.log("Login error: ", error));
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="heading">Login</h1>
        <form onSubmit={(e) => HandleSubmit(e)}>
          <div className="input-group">
            <label className="input-group-text" htmlFor="email">
              Username
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
              Password
            </label>
            <input
              type="text"
              name="password"
              value={data.password}
              placeholder="password"
              onChange={(e) => HandleUserData(e)}
              required
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
