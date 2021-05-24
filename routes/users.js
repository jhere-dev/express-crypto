var express = require("express");
var router = express.Router();

const {
  createUser,
  loginUser,
  getAllUsers,
  removeUser,
} = require("../services/userService");

router.get("/all:limit?:offset?", async (req, res, next) => {
  try {
    const users = await getAllUsers(req.query);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await createUser(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeUser(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
