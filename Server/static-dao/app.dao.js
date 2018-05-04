
var digilabDao = require('./digilab.dao')();
var usersDao = require('./users.dao')( );

var data_access_object = { digilabDao , usersDao };

module.exports = data_access_object;