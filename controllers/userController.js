const { User } = require("../models");
const { generateToken } = require("./authController");
const bcrypt = require("bcrypt");

const userController = {
  registerUser: async (req, res) => {
    try {
      // On récupère les données du nouvel utilisateur depuis
      // le body de la requête
      let userInfo = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      };

      // On vérifie si l'utilisateur existe déjà
      const existingUser = await User.findOne({
        where: { email: userInfo.email },
      });

      // Si l'utilisateur existe déjà, on renvoie une erreur
      if (existingUser) {
        return res.status(400).json({ error: "This user is already created" });
      }

      // si la requête passe bien on créer un nouvel utilisateur
      const newUser = await User.create(userInfo);

      // On renvoie les données de l'utilisateur créé
      res.status(201).json(newUser);

      // On rentre dans le catch si une erreur est survenue
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  loginUser: async (req, res) => {
    try {
      // On récupère les données de la requête
      const { email, password } = req.body;

      // On utilise la méthode findByPk du modèle User pour le récupérer par son id
      const user = await User.findOne({ where: { email } });

      // Si l'utilisateur n'existe pas, on renvoie une erreur
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // On compare le mot de passe envoyé avec celui en base de données
      const passwordMatch = await bcrypt.compare(password, user.password);

      // Si les mots de passe ne correspondent pas, on renvoie une erreur
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // On génère enfin un token pour l'utilisateur
      const token = generateToken(user.id);

      // On renvoie le token dans la réponse
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      // On récupère les données de la requête
      const userDataToUpdate = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      };

      // Si le mot de passe n'est pas renseigné, on le supprime de l'objet
      if (!userDataToUpdate.password) {
        delete userDataToUpdate.password;
      }
      // Si l'email n'est pas renseigné, on le supprime de l'objet
      if (!userDataToUpdate.email) {
        delete userDataToUpdate.email;
      }
      // Si le nom n'est pas renseigné, on le supprime de l'objet
      if (!userDataToUpdate.name) {
        delete userDataToUpdate.name;
      }

      // Mise à jour de l'utilisateur
      await req.user.update(userDataToUpdate);

      // Répondre avec les données mises à jour de l'utilisateur
      res.status(200).json(req.user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      // On récupère l'utilisateur à supprimer
      const user = req.user;

      // Si l'utilisateur n'existe pas, on renvoie une erreur
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // suppression de l'user
      await user.destroy();

      return res.status(200).json("User deleted");
    } catch (error) {
      console.error("Error, user can't be deleted");
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = userController;
