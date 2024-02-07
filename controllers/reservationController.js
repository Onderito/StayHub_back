const { Reservation } = require("../models");

const ReservationController = {
  addReservation: async (req, res) => {
    try {
      let reservationInfo = {
        departure_date: req.body.departure_date,
        arrival_date: req.body.arrival_date,
      };
      const newReservation = await Reservation.create(reservationInfo);
      res.status(201).json(newReservation);
    } catch (error) {
      console.error("Error adding Reservation", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteReservation: async (req, res) => {
    try {
      const reservationId = req.params.id;

      const reservation = await Reservation.findOne({
        where: { id: reservationId },
      });

      if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }
      await reservation.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Reservation was not deleted", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  findReservationById: async (req, res) => {
    try {
      const reservationId = req.params.id;

      const reservation = await Reservation.findByPk(reservationId);

      if (!reservation) {
        // La réservation n'a pas été trouvée
        return res.status(404).json({ error: "Reservation not found" });
      }

      res.status(200).json(reservation);
    } catch (error) {
      console.error("Error getting reservation by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ReservationController;
