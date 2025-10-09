const {
  getTemperatureStats: svcGetTemperatureStats,
  getHumidityStats: svcGetHumidityStats,
} = require("../services/air.services");
const { Code } = require("../const/response.code");
const { Messages } = require("../const/response.message");
const {
  getHumidity: deviceGetHumidity,
  getTemperature: deviceGetTemperature,
} = require("../devices/air.sensor");

async function getTemperature(req, res) {
  const temp = await deviceGetTemperature();
  if (temp) {
    return res.status(Code.Success).json(temp);
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

async function getHumidity(req, res) {
  const humidity = await deviceGetHumidity();
  if (humidity) {
    return res.status(Code.Success).json(humidity);
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

async function getTemperatureStats(req, res) {
  const { start, end } = req.query;
  const result = await svcGetTemperatureStats(start, end);
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ResourceNotFound });
}

async function getHumidityStats(req, res) {
  const { start, end } = req.query;
  const result = await svcGetHumidityStats(start, end);
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
