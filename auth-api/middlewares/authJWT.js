const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "JWT"
    ) {
 
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      req.user = user;
      next();
    } else {
      return res.status(401).send({ message: "No token provided" });
    }
  } catch (err) {
    return res.status(403).send({ message: "Forbidden" });
  }
};

module.exports = verifyToken;
