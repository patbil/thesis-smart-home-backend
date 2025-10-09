const { Code } = require("../const/response.code");
const { Messages } = require("../const/response.message");

function notAllowedMiddleware(req, res) {
  res
    .status(Code.MethodNotAllowed)
    .json({ message: Messages.RequestedMethodNotAllowed });
}

module.exports = notAllowedMiddleware;
