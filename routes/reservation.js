const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authenticate = require("../middleware/authenticate");

router.get(
  "/reservations/get/:id",
  authenticate,
  reservationController.findReservationById
);
router.post(
  "/reservations/add",
  authenticate,
  reservationController.addReservation
);
router.delete(
  "/reservations/delete/:id",
  authenticate,
  reservationController.deleteReservation
);

module.exports = router;
