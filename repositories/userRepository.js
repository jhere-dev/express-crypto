const User = require("../models/User");

exports.findAllUserWithPagination = async (limit, offset) => {
  return await User.findAll({ limit, offset });
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

exports.findUserWithPasswordByEmail = async (email) => {
  return await User.scope("withPassword").findOne({ where: { email } });
};

exports.insertUser = async (user) => {
  await User.create(user);
};
