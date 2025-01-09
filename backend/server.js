require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Import User model or schema
const User = require("./models/User");

app.post("/register", async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        error: "Email Address Already Exists in Records",
      });
    }

    // Hash the password
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let user = new User({
      userImage: req.body.userImage || null,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    // console.log("User: ", user);

    // console.log("_id: ", user._id);
    await user.save();
    console.log("user saved!");

    let data = {
      user: {
        id: user.id,
        _id: user._id, // MongoDB Id
      },
    };

    let token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
      success: true,
      description: "Registration or Signup Successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Registering New User");
  }
});

app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      // Verify Password
      let isMatch = await bcrypt.compare(req.body.password, user.password);
      // console.log("Password Match: ", isMatch);

      if (isMatch) {
        let data = {
          id: user.id,
          _id: user._id, // MongoDB Id
        };

        let token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
          success: true,
          description: "Login Successful",
          token,
        });
      } else {
        res.status(400).json({
          success: false,
          error: "Invalid Credentials",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Login Error");
  }
});

const fetchUser = require("./Middleware/FetchUser");
// API creation
app.get("/", (req, res) => {
  console.log(fetchUser);
  res.send("Express App is Running");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT: ", process.env.PORT);
});
