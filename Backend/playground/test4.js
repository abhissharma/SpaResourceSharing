var appService = require('../business-layer/app.services');  

var sessionService = appService.sessionServices;

// var requestBody = {
//     email : 'testshost@soprasteria.com',
//     usertype : 'Digilab Host',
//     digilabId : 1
// }

// setTimeout( () => {
//     sessionService.getSessionsForUser( requestBody ).then( (result) => {
//         console.log(JSON.stringify(result , null , '\t'));
//     } )
// } , 2000 )

sessionService.getSessionForReceptionist('testrecptionist@gmail.co') 
    .then( result => { console.log(JSON.stringify(result, null ,'\t')) } )
    .catch( error => { console.log(error) } ) ;  