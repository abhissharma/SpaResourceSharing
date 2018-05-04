var db = require('../model/index');

var usersDao = require('./users.dao')( db.USER_TYPE );
var digilabDao = require('./digilab.dao')( db.sequelize , db.Digilab , db.Topic , db.DigilabHost );
var sessionDao = require('./session.dao')( db.sequelize , db.DigiSession , db.SessionTopic , db.Guest , db.SessionHost );
var sessionStateDao = require('./sessionState.dao')( db.SessionState );
var sessionHostDao = require('./sessionHost.dao')( db.SessionHost );
var digilabHostDao = require('./digilabHost.dao')( db.DigilabHost );

var data_access_object = { usersDao , digilabDao , sessionDao , sessionStateDao , sessionHostDao , digilabHostDao };

module.exports = data_access_object;