const { Router } = require("express");
const { catchAsync } = require("../middleware/error");
const { controller } = require("../controllers/users.controller");

const router = Router();

router.get("/", catchAsync(controller.getAll));
router.get("/:id", catchAsync(controller.getById));
router.post("/sign-up", catchAsync(controller.create));
router.post("/sign-in", catchAsync(controller.login));
router.put("/:id", catchAsync(controller.modify));
router.delete("/:id", catchAsync(controller.remove));

module.exports = router;
