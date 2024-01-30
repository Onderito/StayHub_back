const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
