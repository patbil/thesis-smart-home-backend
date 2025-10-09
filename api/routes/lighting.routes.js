const { Router } = require("express");
const { catchAsync } = require("../middleware/error");
const { controller } = require("../controllers/lighting.controller");

const router = Router();

router.get("/state", catchAsync(controller.getInfo));
router.put("/", catchAsync(controller.turn));
router.put("/outside", catchAsync(controller.turnAllOutside));
router.put("/inside", catchAsync(controller.turnAllInside));

module.exports = router;
