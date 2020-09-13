const express = require('express');
const multer = require('multer');
const routes = express.Router();

const Multer = multer({
  storage: multer.memoryStorage(),
})

module.exports = routes;