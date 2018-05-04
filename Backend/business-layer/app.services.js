// var dao = require('../data-access-layer/app.dao');
var staticDao = require('../static-dao/app.dao');

var loginServices = require('./login.services')( staticDao.usersDao );
var digilabServices = require('./digilab.service')( staticDao.digilabDao );
// var sessionServices = require('./session.service')( dao.sessionDao , dao.sessionStateDao , dao.sessionHostDao , dao.digilabHostDao , dao.digilabDao );

// var app_services = { loginServices , digilabServices , sessionServices };
var app_services = { loginServices , digilabServices };

module.exports = app_services;