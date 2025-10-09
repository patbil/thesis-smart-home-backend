const { Router } = require("express");
const { catchAsync } = require("../middleware/error");
const { controller } = require("../controllers/alarm.controller");

const router = Router();

router.get("/state", catchAsync(controller.getStatus));
router.put("/", catchAsync(controller.turn));

module.exports = router;
