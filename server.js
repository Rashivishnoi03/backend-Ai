//this is server.js

const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();
app.get("/", (req, res) => {
  res.send("<h1>hiii</h1>");
});

mongoose
  .connect(process.env.DB_URI)
  .then((data) => {
    console.log(`Mongodb Connected with Server : ${data.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
