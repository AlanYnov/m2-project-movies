const express = require("express");
const router = express.Router();
const { signup, signin, refreshAccessToken, checkAccessToken } = require("../controllers/auth.js");
const userController = require("../controllers/user.js");
const verifyToken = require('../middlewares/authJWT');
const isAdmin = require('../middlewares/isAdmin.js');
const limiter = require('../middlewares/rateLimit.js');

router.post("/account", signup);
router.post("/token", limiter, signin);
router.post("/refresh-token/:refreshToken/token", refreshAccessToken);
router.get("/validate/:accessToken", checkAccessToken);

router.get("/account/me", verifyToken, userController.getCurrentUser);
router.get("/account/:uid", [verifyToken, isAdmin] , userController.getUser);
router.put("/account/:uid", [verifyToken, isAdmin] , userController.editUser);

module.exports = router;
