const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./config/mongoose-connection");

const cookieParser = require("cookie-parser");
const path = require("path");

const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

app.use(express.json());

app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("hey");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
