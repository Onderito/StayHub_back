const { Favoris, Accommodation } = require("../models");

const FavorisController = {
  addFavoris: async (req, res) => {
    try {
      const userId = req.user.id;
      const accommodationId = req.body.accommodationId;

      const existingFavoris = await Favoris.findOne({
        where: { id_user: userId, id_accommodation: accommodationId },
      });

      if (existingFavoris) {
        return res
          .status(400)
          .json({ error: "Accommodation already in favorites" });
      }

      const newFavoris = await Favoris.create({
        id_user: userId,
        id_accommodation: accommodationId,
      });

      res.status(201).json({
        message: "Accommodation added on your favoris",
        favoris: newFavoris,
      });
    } catch (error) {
      console.error("Error adding favoris", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllFavoris: async (req, res) => {
    try {
      const userId = req.user.id;

      const favoris = await Favoris.findAll({
        where: { id_user: userId },
        include: [{ model: Accommodation, as: "accommodation" }],
      });
      res.status(200).json(favoris);
    } catch (error) {
      console.error("Error getting favoris:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteFavoris: async (req, res) => {
    try {
      const userId = req.user.id;
      const accommodationId = req.params.id;

      const favoris = await Favoris.findOne({
        where: { id_user: userId, accommodation_id: accommodationId },
      });

      if (!favoris) {
        return res
          .status(404)
          .json({ error: "Accommodation not found on your fav" });
      }

      await favoris.destroy();
    } catch (error) {
      console.error("Error for remove favoris", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = FavorisController;
