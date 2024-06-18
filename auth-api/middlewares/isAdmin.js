const isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "ROLE_ADMIN") {
      next();
    } else {
      return res
        .status(403)
        .send({ message: "Permission denied. User is not an admin." });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = isAdmin;
