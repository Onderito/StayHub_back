const express = require("express");
const router = express.Router();
const accommodationController = require("../controllers/accommodationController");

router.post("/accommodation", accommodationController.createAccommodation);
router.get("/accommodation/:id", accommodationController.getAccommodationById);
router.put(
  "/accommodation/update/:id",
  accommodationController.updataAccommodation
);
router.delete(
  "/accommodation/delete/:id",
  accommodationController.deleteAccommodation
);

module.exports = router;
