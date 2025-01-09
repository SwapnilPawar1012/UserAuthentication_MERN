import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(data);

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
        .then((response) => console.log("Response: ", response))
        .catch((error) => console.error("Sign Up error: ", error));
    } catch (error) {
      console.error("Sign Up error: ", error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h1 className="heading">Sign Up</h1>
        <form onSubmit={(e) => HandleSubmit(e)}>
          {/* <div className="input-group">
          <label className="input-group-text" htmlFor="file">
            Profile Image
          </label>
          <input
            type="file"
            idName="file-input"
            name="image"
            value={data.profileImage}
            onChange={(e) => HandleUserData(e)}
          />
        </div> */}
          <div className="input-group">
            <label className="input-group-text" htmlFor="username">
              Username
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
              Email
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
              type="password"
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

export default Signup;
