var db = require('../model/index');
var appDao = require('../data-access-layer/app.dao');
var appService = require('../business-layer/app.services');  

var moment = require('moment');

var session = db.DigiSession;
var sessionTopic = db.SessionTopic;
var guest = db.Guest;
var sessionState = db.SessionState;
var sessionHost = db.SessionHost;

var sessionDao = appDao.sessionDao;
var sessionStateDao = appDao.sessionStateDao;
var sessionHostDao = appDao.sessionHostDao;

var sessionService = appService.sessionServices;


var sessionJSON =`{"name": "TestSession",
"initiatorEmail": "testshost@soprasteria.com",
"digilabId": 1,
"startDateTime": null,
"endDateTime": null,
"stateId": 1,
"initiatorName": null,
"duration": null,
"companyId": null,
"reason": null,
"mailToReceptionistSent": false,
"mailToGuestSent": null,
"modifiedOn": "2018-03-29T10:30:31.250Z",
"preBookExpiryTime": 0,
"description": null,
"reminderMailSent": null,
"digilabSpaceId": null 
,"SessionTopics": [
    {
        "name": "testTopic3"
    },
    {
        "name": "testTopic4"
    }
]}`;

var sessionObj = JSON.parse(sessionJSON);

setTimeout( () => {
    console.log( sessionService.getStateIdForState( 'Confirmed' ) );
    console.log( sessionService.getStateForStateId( 1 ) );
} , 4000 )

// sessionService.addSessions( sessionObj ).then( (result) => {
//     console.log(sessionObj);
// } );

// console.log( sessionService.getStateIdForState( 'Confirmed' ) );
// console.log( sessionService.getStateForStateId( 1 ) );

// 2018-03-29 10:30:31.250

// console.log( moment().format('YYYY-MM-DD HH:mm:ss.SSS') );