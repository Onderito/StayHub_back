const { Accomodation } = require("../models");

const AccommodationController = {
  createAccommodation: async (req, res) => {
    try {
      let accommodationInfo = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      };

      if (isNaN(accommodationInfo.price) || accommodationInfo.price <= 0) {
        return res.status(400).json({ error: "Invalid price" });
      }

      const newAccommodation = await Accomodation.create(accommodationInfo);

      res.status(201).json(newAccommodation);
    } catch (error) {
      console.error("Accommodation was not creating", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAccommodationById: async (req, res) => {
    try {
      const accomodationId = req.params.id;

      const accommodation = await Accomodation.findByPk(accomodationId);

      if (!accommodation) {
        return res.status(404).json({ error: "Accommodation not found" });
      }
      res.status(201).json(accommodation);
    } catch (error) {
      console.error("Error getting accommodation by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updataAccommodation: async (req, res) => {
    try {
      const accomodationId = req.params.id;
      const accommodationUpdate = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      };

      const accommodation = await Accomodation.findByPk(accomodationId);

      if (!accommodation) {
        return res.status(404).json({ error: "Accommodation not found" });
      }
      await Accomodation.update(accommodationUpdate);
      res.status(200).json(accommodation);
    } catch (error) {
      console.error("Error updating Accommodation:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteAccommodation: async (req, res) => {
    try {
      const accommodationId = req.params.id;
      const accommodation = await Accomodation.findByPk(accommodationId);

      if (!accommodation) {
        return res.status(404).json({ error: "Accommodation not found" });
      }
      await accommodation.destroy();
    } catch (error) {
      console.error("Error, accommodation can't be deleted");
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = AccommodationController;
