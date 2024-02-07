const { Accommodation } = require("../models");
const multer = require("multer");

// Configuration de Multer pour le stockage des fichiers téléchargés
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage }).single("image");

// Middleware pour gérer le téléchargement de fichiers

const AccommodationController = {
  createAccommodation: async (req, res) => {
    try {
      // if (isNaN(accommodationInfo.price) || accommodationInfo.price <= 0) {
      //   return res.status(400).json({ error: "Invalid price" });
      // }
      console.log(req.body);
      const newAccommodation = await Accommodation.create({
        name: req.body.name,
        image: req.file,
        price: req.body.price,
        description: req.body.description,
      });
      res.json(newAccommodation);
    } catch (error) {
      console.error("Accommodation was not creating", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAccommodationById: async (req, res) => {
    try {
      const accomodationId = req.params.id;

      const accommodation = await Accommodation.findByPk(accomodationId);

      if (!accommodation) {
        return res.status(404).json({ error: "Accommodation not found" });
      }
      res.status(201).json(accommodation);
    } catch (error) {
      console.error("Error getting accommodation by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllAccommodations: async (req, res) => {
    try {
      const accommodations = await Accommodation.findAll();

      res.status(200).json(accommodations);
    } catch (error) {
      console.error("Error getting accommodation by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateAccommodation: async (req, res) => {
    try {
      const accomodationId = req.params.id;
      const accommodationUpdate = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      };

      const accommodation = await Accommodation.findByPk(accomodationId);

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
      const accommodation = await Accommodation.findByPk(accommodationId);

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
