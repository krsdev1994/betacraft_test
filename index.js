const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");
const { mongoUri } = require("./utils/config");

server.listen(5000, () => {
  console.log("started");
});

// converts request in json
app.use(express.json());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
  })
  .then((data) => {
    console.log("DB connected!");
  });

require("./models/index");
require("./routes/index")(app);
