const {
  insertUser,
  findUserWithPasswordByEmail,
  findAllUserWithPagination,
} = require("../repositories/userRepository");
const ERRORS = require("../utils/errorMessages");
const encryptPassword = require("../utils/encryptPassword");

const createUser = async (user) => {
  const { email, password, name } = user;
  if (!email || !password) throw new Error(ERROR.NO_USER_DATA_PROVIDED);

  const encryptedPassword = await encryptPassword(password);

  await insertUser({ email, password: encryptedPassword, name });
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) throw new Error(ERRORS.INVALID_DATA);

  const user = await findUserWithPasswordByEmail(email);

  if (!user) throw new Error(ERROR.INVALID_USER);

  const encryptedPassword = await encryptPassword(password);

  if (user.password !== encryptedPassword) {
    throw new Error(ERROR.INVALID_PASSWORD);
  }

  return user.toJSON();
};

const getAllUsers = async (pagination) => {
  const { limit = 10, offset = 0 } = pagination;
  return await findAllUserWithPagination(+limit, +offset);
};

module.exports = { createUser, loginUser, getAllUsers };
