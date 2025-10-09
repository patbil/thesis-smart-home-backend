const { Code } = require("../const/response.code");
const { Messages } = require("../const/response.message");
const { changeStateServo } = require("../devices/servo.driver");
const {
  getInfo: svcGetInfo,
  update: svcUpdate,
} = require("../services/servo.services");

async function getInfo(req, res) {
  const result = await svcGetInfo();
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ResourceNotFound });
}

async function turn(req, res) {
  const data = req.body;

  // If the servo name is a gateway, send a blinking light
  if (data.name === "gateway") {
    process.emit("SIGTOLG"); // Turn On Light Gate
  }

  changeStateServo(data);
  const result = await svcUpdate(data.address, data.state);

  if (result.affectedRows) {
    return res.status(Code.Success).json({ message: Messages.ServoModified });
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

exports.controller = {
  getInfo,
  turn,
};
