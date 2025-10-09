const {
  getAll: svcGetAll,
  getById: svcGetById,
  removeUser: svcRemoveUser,
  createUser: svcCreateUser,
  updateUser: svcUpdateUser,
  userExist: svcUserExist,
} = require("../services/users.services");
const { Code } = require("../const/response.code");
const { Messages } = require("../const/response.message");
const { hashPassword, compare } = require("../helper/password");

const jwt = require("jsonwebtoken");

async function create(req, res) {
  req.body.password = await hashPassword(req.body.password);
  delete req.body.password_confirm;

  const result = await svcCreateUser(Object.values(req.body));
  if (result.affectedRows) {
    return res.status(Code.Success).json({ message: Messages.UserCreated });
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await svcUserExist(email);

  if (user.length) {
    const comparison = compare(password, user.at(0).password);
    if (comparison) {
      const { id, name, surname, role } = user.at(0);
      const token = jwt.sign({ userId: id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      return res.status(Code.Success).json({
        token,
        expiresIn: 7200,
        user: { id, name, surname, role },
      });
    }
  }
  return res
    .status(Code.Unauthorized)
    .json({ message: Messages.InvalidCredentials });
}

async function modify(req, res) {
  delete req.body.password_confirm;
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  } else {
    delete req.body.password;
  }

  const result = await svcUpdateUser(req.body, req.params.id);
  if (result.changedRows) {
    return res.status(Code.Success).json({ message: Messages.UserUpdated });
  }
  return res.status(Code.Conflict).json({ message: Messages.ServerError });
}

async function getAll(req, res) {
  const result = await svcGetAll();
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ServerError });
}

async function getById(req, res) {
  const { id } = req.params;
  const result = await svcGetById(id);
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ResourceNotFound });
}

async function remove(req, res) {
  const { id } = req.params;
  const result = await svcRemoveUser(id);
  if (result.affectedRows) {
    return res.status(Code.Success).json({ message: Messages.UserDeleted });
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

exports.controller = {
  create,
  login,
  modify,
  getAll,
  getById,
  remove,
};
