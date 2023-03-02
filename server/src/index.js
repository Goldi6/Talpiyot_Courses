// TODO remove all console.log statements

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./db/mongoose");

const routerHandler = require("./routers/");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(routerHandler);

////
////
const port = process.env.PORT;

app.listen(port, () => {
  console.log("connected on port: ", port);
});
