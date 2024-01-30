const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.createUser);
router.get("/users/get/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
