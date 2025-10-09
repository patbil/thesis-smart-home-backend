const {
  getTemperatureStats,
  getHumidityStats,
} = require("../services/air.services");
const { Code } = require("../const/response.code");
const { Messages } = require("../const/response.message");
const { getHumidity, getTemperature } = require("../devices/air.sensor");

async function getTemperature(req, res) {
  const temp = await getTemperature();
  if (temp) {
    return res.status(Code.Success).json(temp);
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

async function getHumidity(req, res) {
  const humidity = await getHumidity();
  if (humidity) {
    return res.status(Code.Success).json(humidity);
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

async function getTemperatureStats(req, res) {
  const { start, end } = req.query;
  const result = await getTemperatureStats(start, end);
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ResourceNotFound });
}

async function getHumidityStats(req, res) {
  const { start, end } = req.query;
  const result = await getHumidityStats(start, end);
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ResourceNotFound });
}

exports.controller = {
  getTemperature,
  getHumidity,
  getTemperatureStats,
  getHumidityStats,
};
