var db = require('../model/index');
var appDao = require('../data-access-layer/app.dao');

var Dilgilab = db.sequelize.model('Digilab');
var Topic = db.sequelize.model('Topic');
var digilabDao = appDao.digilabDao;

// digilabDao.getDigilabs().then( (result) => {
//     console.log( JSON.stringify(result) );
// } )

// digilabDao.getDigilabForId(1).then( (result) => {
//     console.log( JSON.stringify(result) );
// } )

var digilab = {
    name : 'Test Digilab 1' , 
    receptionEmail : 'testreceptionist2@gmail.com' , 
    locationLat : 0 , 
    locationLong : 0 , 
    isEmailNotificationEnabled : false , 
    isPushNotificationEnabled : false , 
    isOpenForBusiness : false , 
    feedBackDelayTime : 0 , 
    preBookExpiryTime : 0 , 
    monday : false , 
    tuesday : false , 
    wednesday : false , 
    thursday : false , 
    friday : false 
}

// digilabDao.addDigilab( digilab , {} ).then( (result) => {
//     result.reload().then( (result) => console.log(result) );
// } , (err) => console.log(err) );

// Dilgilab
//     .create( {
//         name : 'Test Digilab 1' , 
//         receptionEmail : 'testreceptionist2@gmail.com' , 
//         locationLat : 0 , 
//         locationLong : 0 , 
//         isEmailNotificationEnabled : false , 
//         isPushNotificationEnabled : false , 
//         isOpenForBusiness : false , 
//         feedBackDelayTime : 0 , 
//         preBookExpiryTime : 0 , 
//         monday : false , 
//         tuesday : false , 
//         wednesday : false , 
//         thursday : false , 
//         friday : false ,
//     } , {
        
//     } )
//     .then( digilab => { console.log(digilab) } )
//     .catch( error => { console.log(error) } ) ;

// Dilgilab.max('id').then( result => console.log(result) );

digilabDao.getDigilabsForReceptionistEmail( 'testrecptionist@gmail.co' )
    .then( result => { console.log(JSON.stringify(result, null ,'\t')) } )
    .catch( error => { console.log(error) } ) ;