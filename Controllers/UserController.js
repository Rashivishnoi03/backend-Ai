const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendToken = (user, status, res) => {
  try {
    const { email, password } = user;
    const payload = {
      email,
      password,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    // const options = {
    //   expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    //   path: "/",
    //   // domain: ".vercel.app",
    // };

    // res.status(status).cookie("token", token, options).json({
    //   success: true,
    //   user,
    //   token,
    // });
    // res.cookie("token", token, options);
    res.status(status).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.header("authToken");
    if (!token) {
      return res.status(403).json({
        success: "false",
        message: "login first in order to access the resource",
      });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findOne({ email: decodedData.email });
    next();
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendToken(req.body, 201, res);
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: "false",
        message: "input email and password",
      });
    } else {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        res.status(400).json({
          success: "false",
          message: "invalid email or password",
        });
      } else {
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (isPasswordMatched) {
          sendToken(user, 200, res);
        } else {
          res.status(400).json({
            success: "false",
            message: "invalid email or password",
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

const userLogout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { userSignup, userLogin, isAuthenticatedUser, userLogout };
