const express = require("express");
const index = require("./routes/index");
const db = require("./database/DatabaseConnection");
const verifyToken = require("./middleware/verify-token");

db.authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", verifyToken);
app.use("/", index);

app.listen(8000, () => {
  console.log("Connected");
});
