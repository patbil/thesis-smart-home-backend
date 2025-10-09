require("dotenv").config({ path: "config/.env" });

const airSensor = require("./api/devices/air.sensor");
const alarm = require("./api/devices/alarm");
const lightSensor = require("./api/devices/light.sensor");
const lighting = require("./api/devices/lighting");
const servoDriver = require("./api/devices/servo.driver");

const http = require("http");
const app = require("./app");
const server = http.createServer(app);

(async () => {
  await airSensor.init();
  await lightSensor.init();
  await lighting.init();
  await servoDriver.init();
  await alarm.init();

  server.listen(process.env.SERVER_PORT, () => {
    console.log("The server API start listening.");
  });
})();
