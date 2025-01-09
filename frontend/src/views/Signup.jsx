import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({
    profileImage: "",
    username: "",
    email: "",
    password: "",
  });
  console.log(data);

  const HandleUserData = (obj) => {
    setData((prevData) => {
      [...prevData, obj];
    });
  };

  const HandleSubmit = () => {};

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h1 className="heading">Sign Up</h1>
        <div className="input-group">
          <label className="input-group-text" for="file">
            Profile Image
          </label>
          <input
            type="file"
            idName="file-input"
            name="image"
            onChange={(e) => HandleUserData(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-group-text" for="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => HandleUserData(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-group-text" for="email">
            Email
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
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => HandleUserData(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" onClick={HandleSubmit()}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Signup;
