const express = require("express");
const router = express.Router();
const accommodationController = require("../controllers/accommodationController");
const authenticate = require("../middleware/authenticate");

router.post(
  "/accommodation/create",
  authenticate,

  accommodationController.createAccommodation
);
router.get("/accommodations", accommodationController.getAllAccommodations);
router.get(
  "/accommodation/get/:id",
  accommodationController.getAccommodationById
);
router.put(
  "/accommodation/update/:id",
  authenticate,
  accommodationController.updateAccommodation
);
router.delete(
  "/accommodation/delete/:id",
  authenticate,
  accommodationController.deleteAccommodation
);

module.exports = router;
