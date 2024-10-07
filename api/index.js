const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const compression = require("compression");
const { colors, log } = require("mercedlogger");

const db = require('./lib/db');
const login = require('./lib/login');
const routes_login = require('./lib/routes_login');
const routes_company = require('./lib/routes_company');
console.log("test");
const app = express();

require('dotenv-safe').config();

const port = (process.env.API_PORT) ? process.env.API_PORT : 80;

app.listen(port, () => log.green('SERVER STATUS', `http server running in ${port}`));

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("combined"));

app.use('/v1', login);
app.use('/v1', routes_login);
app.use('/v1', routes_company);