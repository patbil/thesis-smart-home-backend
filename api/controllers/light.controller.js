const { Code } = require("../const/response.code");
const { Messages } = require("../const/response.message");
const { getInfo, update } = require("../services/light.services");
const { turnOffSensor, turnOnSensor } = require("../devices/light.sensor");

async function getInfo(req, res) {
  const result = await getInfo();
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ResourceNotFound });
}

async function turn(req, res) {
  req.body.enabled ? turnOnSensor() : turnOffSensor();
  const result = await update(Number(req.body.enabled));
  if (result.affectedRows) {
    return res.status(Code.Success).json({ message: Messages.SensorModified });
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

exports.controller = {
  getInfo,
  turn,
};
