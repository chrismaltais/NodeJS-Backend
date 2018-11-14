const express = require("express");
const bodyParser = require("body-parser");
const request = require("supertest");

const controllers = require("./../../controllers");
const api = require("../../api");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api/", api(controllers));

module.exports = {
    appTest: request(app)
}