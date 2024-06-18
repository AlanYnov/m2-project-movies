const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await User.findOne({uid}, { password: 0 });
    const userResponse = {
      uid: user.uid,
      login: user.login,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    if (!user) {
      return res.status(404).send({
        message: "User not found.",
      });
    }
    res.status(200).send(userResponse);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving the user.",
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    const userResponse = {
      uid: user.uid,
      login: user.login,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).send(userResponse);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving the user.",
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const uid = req.params.uid;
    const updatedFields = req.body;

    const user = await User.findOneAndUpdate({ uid }, updatedFields, { new: true });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while updating the user." });
  }
};