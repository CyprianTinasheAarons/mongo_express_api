const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Cannotc onnect to MongoDB", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tutorial Api" });
});

require("./app/routes/tutorial.routes.js")(app);

//set port , listen for requests
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
