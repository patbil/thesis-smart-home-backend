const { Gpio } = require("onoff");
const { getInfo } = require("../services/lighting.services");
let lights = {}; // Object with GPIO

async function init() {
  const result = await getInfo();
  result.forEach((el) => {
    lights[el.name] = new Gpio(el.address, "out", "both");
    lights[el.name].writeSync(el.state);
  });

  console.log("Lighting initialization completed successfully.");

  // Socket for the signal of lighting the gate lamp - SIG-TOLG(Turn On Light Gate)
  process.on("SIGTOLG", () => blinkLED());
}

function changeStateLighting(data) {
  lights[data.name].writeSync(Number(data.state));
}

function blinkLED() {
  const led = lights["Brama"];
  const timer = setInterval(() => {
    if (led.readSync() === 0) {
      led.writeSync(1);
    } else {
      led.writeSync(0);
    }
  }, 100);

  setTimeout(() => {
    clearInterval(timer);
    led.writeSync(0);
  }, 900);
}

module.exports = { init, changeStateLighting };
