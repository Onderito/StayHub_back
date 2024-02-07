const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

router.post("/users/create", userController.registerUser);
router.post("/users/login", userController.loginUser);
router.put("/users/update", authenticate, userController.updateUser);
router.delete("/users/delete", authenticate, userController.deleteUser);

module.exports = router;
