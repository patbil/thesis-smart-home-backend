const aht20 = require("aht20-sensor");
const { pushTemperature, pushHumidity } = require("../services/air.services");

let sensor;

async function init() {
  await aht20.open().then(async (dev) => {
    sensor = dev;

    const temp = await dev.temperature();
    const hum = await dev.humidity();
    console.log(
      "Air sensor initialization successful. Current values: Temp: " +
        Math.round(temp) +
        "°C, Humidity: " +
        Math.round(hum) +
        "%"
    );
  });

  setInterval(() => {
    pushStatisticTemp();
    pushStatisticHum();
  }, 300000);
}

async function getTemperature() {
  return Math.round(await sensor.temperature());
}

async function getHumidity() {
  return Math.round(await sensor.humidity());
}

async function pushStatisticTemp() {
  await pushTemperature({
    value: Math.round(await sensor.temperature()),
    timestamp: Date.now(),
  });
}

async function pushStatisticHum() {
  await pushHumidity({
    value: Math.round(await sensor.humidity()),
    timestamp: Date.now(),
  });
}

module.exports = { init, getHumidity, getTemperature };
