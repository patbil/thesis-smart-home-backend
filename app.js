const express = require("express");
const cors = require("cors");
const notAllowedMiddleware = require("./api/middleware/not-allowed");

const airRoutes = require("./api/routes/air.routes");
const alarmRoutes = require("./api/routes/alarm.routes");
const servoRoutes = require("./api/routes/servo.routes");
const lightRoutes = require("./api/routes/light.routes");
const lightingRoutes = require("./api/routes/lighting.routes");
const userRoutes = require("./api/routes/users.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/air", airRoutes);
app.use("/alarm", alarmRoutes);
app.use("/light", lightRoutes);
app.use("/lighting", lightingRoutes);
app.use("/users", userRoutes);
app.use("/servo", servoRoutes);
app.use(notAllowedMiddleware);

module.exports = app;
