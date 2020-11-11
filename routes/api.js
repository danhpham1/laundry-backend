const express = require('express');
const route = express.Router();

//controller 
const testController = require('../controllers/test');

route.get('/test', testController.testController);

module.exports = route;