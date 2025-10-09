const { Gpio } = require("onoff");
const { getInfo, turnOnBuzzer } = require("../services/alarm.services");

let pir, buzzer;

async function init() {
  const result = await getInfo();

  result.forEach((el) => {
    if (el.name === "Buzzer") {
      buzzer = new Gpio(el.address, "out", "both");
      buzzer.writeSync(el.state);
    }
    if (el.name === "Pir") {
      pir = new Gpio(el.address, "in", "rising", { debounceTimeout: 10 });
      if (el.state) {
        turnOnPir();
      }
    }
  });

  console.log("Alarm devices have been initialized.");
}

async function turnOnPir() {
  pir.watch(async (err, val) => {
    if (err) {
      throw err;
    }

    buzzer.writeSync(0);
    console.log("Value from PIR: ", Boolean(val));

    // Update record in database
    await turnOnBuzzer();
  });
}

function turnOffAlarm() {
  pir.unwatchAll();
  buzzer.writeSync(1);
}

module.exports = { init, turnOnPir, turnOffAlarm };
