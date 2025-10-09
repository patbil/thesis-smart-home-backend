const { Router } = require("express");
const { catchAsync } = require("../middleware/error");
const { controller } = require("../controllers/light.controller");

const router = Router();

router.get("/state", catchAsync(controller.getInfo));
router.put("/", catchAsync(controller.turn));

module.exports = router;
