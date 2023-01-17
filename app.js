const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const componentsRouter = require("./routers/componentsRouter");
const pagesRouter = require("./routers/pagesRouter");
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/components", componentsRouter);
app.use("/pages", pagesRouter);

app.set("view engine", "hbs")

app.listen(8080);