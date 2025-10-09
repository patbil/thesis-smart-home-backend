const { Code } = require("../const/response.code");
const { Messages } = require("../const/response.message");
const { turnOffAlarm, turnOnPir } = require("../devices/alarm");
const { getStatus, turnOff, turnOnPir } = require("../services/alarm.services");

async function getStatus(req, res) {
  const result = await getStatus();
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ResourceNotFound });
}

async function turn(req, res) {
  let result;

  if (req.body.enabled) {
    await turnOnPir();
    result = await turnOnPir();
  } else {
    turnOffAlarm();
    result = await turnOff();
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
