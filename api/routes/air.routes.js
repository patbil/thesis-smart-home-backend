const { Router } = require("express");
const { catchAsync } = require("../middleware/error");
const { controller } = require("../controllers/air.controller");

const router = Router();

router.get("/temperature", catchAsync(controller.getTemperature));
router.get("/humidity", catchAsync(controller.getHumidity));
router.get("/temperature/stats", catchAsync(controller.getTemperatureStats));
router.get("/humidity/stats", catchAsync(controller.getHumidityStats));

module.exports = router;
