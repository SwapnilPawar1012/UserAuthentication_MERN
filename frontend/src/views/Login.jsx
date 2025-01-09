import React, { useState } from "react";

function Login() {
  const [data, setData] = useState({ email: "", password:""});
  console.log(data);

  const HandleUserData = (obj) => {
    setData((prevData) => {
      [...prevData, obj]
    })
  }

  const HandleSubmit = () => {

  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="heading">Login</h1>
        <div className="input-group">
          <label className="input-group-text" for="email">
            Username
          </label>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={(e) => HandleUserData(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-group-text" for="password">
            Password
          </label>
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={(e) => HandleUserData(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
}

export default Login;
