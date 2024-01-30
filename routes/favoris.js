const express = require("express");
const router = express.Router();
const favoris = require("../controllers/favorisController");
const FavorisController = require("../controllers/favorisController");

router.get("/favoris", FavorisController.getAllFavoris);
router.post("/favoris/:id", FavorisController.addFavoris);
router.delete("/favoris/delete/:id", FavorisController.deleteFavoris);

module.exports = router;
