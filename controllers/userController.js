const { User } = require("../models/user");

const userController = {
  createUser: async (req, res) => {
    try {
      let userInfo = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      };
      const existingUser = await User.findOne({
        where: { email: userInfo.email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "This user is already created" });
      }

      const newUser = await User.create(userInfo);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUserById: async (req, res) => {
    try {
      // On récupère l'id de l'utilisateur depuis les paramètres de la requête
      const id_user = req.params.id;
      console.log(id_user);

      // On utilise la méthode findByPk du modèle User pour le récupérer par son id
      const user = await User.findByPk(id_user);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const userDataToUpdate = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      };

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.update(userDataToUpdate);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.destroy();
    } catch (error) {
      console.error("Error, user can't be deleted");
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = userController;
