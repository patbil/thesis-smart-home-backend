const { Gpio } = require("onoff");
const { getInfo } = require("../services/light.services");
let sensor,
  lastTimeChanged = 0,
  timeout = 60000;

async function init() {
  const result = await getInfo();
  sensor = new Gpio(result.at(0).address, "in", "rising");
  console.log("Light sensor initialization successful.");

  if (result.at(0).state) {
    turnOnSensor();
  }
}

function turnOnSensor() {
  sensor.watch(async (err, val) => {
    if (err) {
      throw err;
    }

    const currentTime = Date.now();
    if (currentTime - lastTimeChanged < timeout) {
      return;
    }

    lastTimeChanged = currentTime;
    process.emit("SIGBLIND"); // Send a signal to close the blind
    console.log("Value from light sensor: ", Boolean(val));
  });
}

function turnOffSensor() {
  sensor.unwatchAll();
}

module.exports = { init, turnOnSensor, turnOffSensor };
