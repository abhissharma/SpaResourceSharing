var appServices = require('../business-layer/app.services');

var loginController = require('./login.controller')( appServices.loginServices );
var digilabController = require('./digilab.controller')( appServices.digilabServices );
var sessionController = require('./session.controller')( appServices.sessionServices );

var app_controller = { loginController , digilabController , sessionController };

module.exports = app_controller;