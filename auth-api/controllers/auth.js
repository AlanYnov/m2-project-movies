const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Register to database
exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = new User({
      login: req.body.login,
      password: hashedPassword,
      role: req.body.role,
      status: req.body.status || "open",
    });

    const savedUser = await user.save();

    const userResponse = {
      uid: savedUser.uid,
      login: savedUser.login,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };

    res.status(200).send(userResponse);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while registering the user.",
    });
  }
};

// Sign in and get token
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.API_SECRET_KEY, {
      expiresIn: 3600,
    });
    const refreshToken = jwt.sign({ id: user.id }, process.env.API_SECRET_KEY, {
      expiresIn: 7200,
    });

    const decodedAccessToken = jwt.decode(accessToken);
    const decodedRefreshToken = jwt.decode(refreshToken);

    const accessTokenExpiresAt = new Date(
      decodedAccessToken.exp * 1000
    ).toISOString();
    const refreshTokenExpiresAt = new Date(
      decodedRefreshToken.exp * 1000
    ).toISOString();

    res.status(200).send({
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while signing in.",
    });
  }
};

// Function to refresh the access token using the refresh token
exports.refreshAccessToken = async (req, res) => {
  const refreshToken = req.params.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, process.env.API_SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newAccessToken = jwt.sign({ id: userId }, process.env.API_SECRET_KEY, {
      expiresIn: 3600,
    });
    const newRefreshToken = jwt.sign({ id: user.id }, process.env.API_SECRET_KEY, {
      expiresIn: 7200,
    });

    const decodedAccessToken = jwt.decode(newAccessToken);
    const decodedRefreshToken = jwt.decode(newRefreshToken);

    const accessTokenExpiresAt = new Date(
      decodedAccessToken.exp * 1000
    ).toISOString();
    const refreshTokenExpiresAt = new Date(
      decodedRefreshToken.exp * 1000
    ).toISOString();

    res.status(200).json({
      accessToken: newAccessToken,
      accessTokenExpiresAt,
      refreshToken: newRefreshToken,
      refreshTokenExpiresAt,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token." });
  }
};

// Check duration of token expiration
exports.checkAccessToken = async (req, res) => {
  const accessToken = req.params.accessToken;

  try {
    const decodedAccessToken = jwt.decode(accessToken);
    const accessTokenExpiresAt = new Date(
      decodedAccessToken.exp * 1000
    ).toISOString();

    res.status(200).json({
      accessToken,
      accessTokenExpiresAt,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token." });
  }
};