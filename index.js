const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/user");
const accommodationRouter = require("./routes/accommodation");
const favoriRouter = require("./routes/favori");
const reservationController = require("./routes/reservation");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", accommodationRouter);
app.use("/api", favoriRouter);
app.use("/api", reservationController);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
