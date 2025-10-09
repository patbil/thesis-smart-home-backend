const { Code } = require("../const/response.code");
const { Messages } = require("../const/response.message");
const {
  turnOffAlarm,
  turnOnPir: deviceTurnOnPir,
} = require("../devices/alarm");
const {
  getStatus: svcGetStatus,
  turnOff: svcTurnOff,
  turnOnPir: svcTurnOnPir,
} = require("../services/alarm.services");

async function getStatus(req, res) {
  const result = await svcGetStatus();
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ResourceNotFound });
}

async function turn(req, res) {
  let result;

  if (req.body.enabled) {
    await deviceTurnOnPir();
    result = await svcTurnOnPir();
  } else {
    turnOffAlarm();
    result = await svcTurnOff();
  }

  if (result.affectedRows) {
    return res.status(Code.Success).json({ message: Messages.AlarmModified });
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

exports.controller = {
  getStatus,
  turn,
};
