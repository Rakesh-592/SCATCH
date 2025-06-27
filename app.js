const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./config/mongoose-connection");
const jwt = require("jsonwebtoken");
const expressSession = require("express-session");
const flash = require("connect-flash");
const createAdminRoute = require("./routes/createAdmin");

require("dotenv").config();

const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());

//routing file paths
const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/", createAdminRoute);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index", { error: "" });
// });

app.get("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
