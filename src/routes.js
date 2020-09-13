const express = require('express');
const multer = require('multer');
const routes = express.Router();

const uploadFile = require('../firebase/index');

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

routes.post('/upload', Multer.single('file'), uploadFile, (req, res) =>{
  const { firebaseUrl} = req.file;

  return res.status(201).json({url : firebaseUrl});

});

module.exports = routes;