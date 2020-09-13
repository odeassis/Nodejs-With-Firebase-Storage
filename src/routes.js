const express = require('express');
const multer = require('multer');
const routes = express.Router();

const uploadImage = require('../firebase/index');

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

routes.post('/upload', Multer.single('imagem'), uploadImage, (req, res) =>{
  
  return console.log(req.file);

});

module.exports = routes;