/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

require("dotenv").config();

const express = require("express");
export const app = express();
const sequelize = require("./db");
const cors = require("cors");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/errorHandlingMiddleware");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

// Обработка ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
