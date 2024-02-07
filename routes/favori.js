const express = require("express");
const router = express.Router();
const favoriController = require("../controllers/favoriController");
const authenticate = require("../middleware/authenticate");

router.post("/favoris/:id", authenticate, favoriController.addFavoris);
router.get("/favoris/getAll", authenticate, favoriController.getAllFavoris);
router.delete(
  "/favoris/delete/:id",
  authenticate,
  favoriController.deleteFavoris
);

module.exports = router;
