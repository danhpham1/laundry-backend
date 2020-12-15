const express = require('express');
const route = express.Router();

//middlewares
const middlewaresPrivateApi = require('../middlewares/private-api');

//controller 
const groupController = require('../controllers/group');
const nameController = require('../controllers/name');
const userController = require('../controllers/user');
const laundryController = require('../controllers/laundry');

//api group laundry
route.get('/groups', groupController.getGroups);
route.post('/groups', groupController.postGroup);
route.patch('/group/:id', groupController.patchGroup);
route.delete('/group/:id', groupController.deleteGroup);

//api name laundry
route.get('/names', nameController.getNameLaundry);
route.post('/names', nameController.postNameLaundry);
route.patch('/name/:id', nameController.pathchNameLaundry);
route.delete('/name/:id', nameController.deleteNameLaundry);

//api laundry
route.get('/laundries/:idUser', laundryController.getLaundry);
route.post('/laundries', laundryController.postLaundry);
route.patch('/laundry/:id', laundryController.patchLaundry);
route.delete('/laundry/:id', laundryController.deleteLaundry);

//api user laundry
route.post('/users', userController.postUser);
route.patch('/users/:username', userController.patchChangePassword);

//api forgot password
route.post('/forgot/:email', userController.forgotPassword);

//api auth
route.post('/auth', userController.postAuth);

module.exports = route;