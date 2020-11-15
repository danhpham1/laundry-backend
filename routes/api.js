const express = require('express');
const route = express.Router();

//controller 
const groupController = require('../controllers/group');
const nameController = require('../controllers/name');

//api group laundry
route.get('/groups', groupController.getGroups);
route.post('/groups', groupController.postGroup);
route.patch('/group/:id', groupController.patchGroup);

//api name laundry
route.get('/names', nameController.getNameLaundry);
route.post('/names', nameController.postNameLaundry);

module.exports = route;