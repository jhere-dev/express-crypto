var express = require("express");
var router = express.Router();

const User = require("../models/User");
const {
  createUser,
  loginUser,
  getAllUsers,
} = require("../services/userService");

router.get("/all:limit?:offset?", async (req, res) => {
  try {
    const users = await getAllUsers(req.query);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    await createUser(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.sendStatus(204);
});

module.exports = router;
