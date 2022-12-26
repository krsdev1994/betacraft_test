const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.register);
router.get("/:id", userController.userById);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);
router.get("/", userController.list);

module.exports = router;
