const {
  insertUser,
  findUserWithPasswordByEmail,
  findAllUserWithPagination,
  deleteUserById,
} = require("../repositories/userRepository");
const ERRORS = require("../utils/errorMessages");
const encryptPassword = require("../utils/encryptPassword");
const HttpError = require("../utils/httpError");

const createUser = async (user) => {
  const { email, password, name } = user;
  if (!email || !password) {
    throw new HttpError(400, ERRORS.NO_USER_DATA_PROVIDED);
  }

  const encryptedPassword = await encryptPassword(password);

  await insertUser({ email, password: encryptedPassword, name });
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) new HttpError(401, ERRORS.INVALID_DATA);

  const user = await findUserWithPasswordByEmail(email);

  if (!user) throw new HttpError(401, ERRORS.INVALID_USER);

  const encryptedPassword = await encryptPassword(password);

  if (user.password !== encryptedPassword) {
    throw new HttpError(401, ERRORS.INVALID_PASSWORD);
  }

  return user.toJSON();
};

const getAllUsers = async (pagination) => {
  const { limit = 10, offset = 0 } = pagination;
  return await findAllUserWithPagination(+limit, +offset);
};

const removeUser = async (id) => {
  if (!id) throw new HttpError(400, ERRORS.INVALID_ID);

  await deleteUserById(id);
};

module.exports = { createUser, loginUser, getAllUsers, removeUser };
