const express = require('express');
const multer = require('multer');
const routes = express.Router();

const multerConfig = require('../config/multer');

const uploadFile = require('../firebase/index');

routes.post('/upload', multer(multerConfig).single('file'), uploadFile, (req, res) =>{
  
  return console.log(req.file);

});

module.exports = routes;