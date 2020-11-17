const express = require('express');
const route = express.Router();

//controller 
const groupController = require('../controllers/group');
const nameController = require('../controllers/name');
const userController = require('../controllers/user');

//api group laundry
route.get('/groups', groupController.getGroups);
route.post('/groups', groupController.postGroup);
route.patch('/group/:id', groupController.patchGroup);

//api name laundry
route.get('/names', nameController.getNameLaundry);
route.post('/names', nameController.postNameLaundry);
route.patch('/name/:id', nameController.pathchNameLaundry);

//api user laundry
route.post('/users', userController.postUser);

module.exports = route;