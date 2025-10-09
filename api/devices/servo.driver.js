const i2cBus = require("i2c-bus");
const Pca9685Driver = require("pca9685").Pca9685Driver;
const {
  getInfo,
  getBlindState,
  update,
} = require("../services/servo.services");

let PWM = null; // Keep device in variable

async function init() {
  PWM = new Pca9685Driver(
    {
      i2c: i2cBus.openSync(1),
      address: 0x40,
      frequency: 50,
      debug: false,
    },
    (err) => {
      if (err) {
        console.log("Error: initializing controller PCA9865.");
        process.exit(-1);
      }
      console.log("PCA9865 - Initialization done.");
    }
  );

  const result = await getInfo();
  result.forEach((el) => {
    changeStateServo(el);
  });

  // Light detection signal socket - close the blind
  process.on("SIGBLIND", () => {
    closeBlind();
  });
}

function changeStateServo(data) {
  if (data.state) {
    PWM.setPulseLength(data.address, data.rangeOff);
  } else {
    PWM.setPulseLength(data.address, data.rangeOn);
  }
}

async function closeBlind() {
  const result = await getBlindState();
  const blind = result.at(0);
  if (!blind.state) {
    blind.state = true;
    changeStateServo(blind);
    update(blind.address, 1);
  }
}

module.exports = { init, changeStateServo };
