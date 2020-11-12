const express = require('express');
const route = express.Router();

//controller 
const groupController = require('../controllers/group');

//api group laundry
route.get('/groups', groupController.getGroups);
route.post('/groups', groupController.postGroup);
route.patch('/group/:id', groupController.patchGroup);

module.exports = route;