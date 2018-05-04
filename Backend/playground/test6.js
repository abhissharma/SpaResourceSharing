var db = require('../model/index');
var appDao = require('../static-dao/app.dao');

// var Digilab = db.Digilab;
// var Topic = db.Topic;
// var DigilabHost = db.DigilabHost;
// var users = db.USER_TYPE;

// users.
//     findAll(  )
//     .then( ( digilabs ) => {   
//         console.log( JSON.stringify(digilabs,null,'  ') );
//     } , (error) => {
//         reject ( error.parent.message ); 
//     });
// var fs        = require('fs');

// digilabs = require('../static-data/digilabs.json');

var usersDao = appDao.usersDao;

usersDao.getUser( 'testshost@soprasteria.com' , 'shos2t' ).then( (users) => {
    console.log(users);
} , (error) => {
    console.log(error);
} );
 
  