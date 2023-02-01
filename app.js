const express = require("express");
const cors = require("cors");

function createApp() {
  // // app.use(cookieParser());
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors({ origin: "*", credentials: true }));

  app.use("/api", require("./routes"));
  return app;
}

module.exports = createApp;
