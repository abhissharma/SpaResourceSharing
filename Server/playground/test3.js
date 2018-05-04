var db = require('../model/index');
var appDao = require('../data-access-layer/app.dao');

var session = db.DigiSession;
var sessionTopic = db.SessionTopic;
var guest = db.Guest;
var sessionState = db.SessionState;
var sessionHost = db.SessionHost;

var sessionDao = appDao.sessionDao;
var sessionStateDao = appDao.sessionStateDao;
var sessionHostDao = appDao.sessionHostDao;

var Op = db.Sequelize.Op

var sessionObj ;

// session.findAll( { where : { id : 1 }  , include : [ sessionTopic , guest ] } ).then( (result) => {
//     // console.log( JSON.stringify( result[0] , null, '\t' ) );
//     sessionObj = result[0].get({plain: true});
//     return sessionState.findAll(  );
// }).then( (result) => {
//     sessionObj.state = result.filter( (sessionState) => sessionState.dataValues.id == sessionObj.stateId )[0].dataValues.state;
//     console.log( sessionObj );
// } );      

// sessionHost.findAll( { where : { email : 'testshost@soprasteria.com' } } ).then( (result) => {
//     console.log( JSON.stringify( result ) );
// } );  

// session.findAll( { where : { id : [6,1] } } ).then( (result) => {
//     console.log(result.get);
// } )

// sessionDao.getSessionForDigilab( 1 , 1 ).then( result => {
//     for( var index in result ){
//         result[index].set( 'stateId' , 'abc' );
//     }
//     console.log( JSON.stringify( result , null , '\t' ) );
    
// } ); 

// sessionStateDao.getStates( ).then( result => {
    
//     console.log(result);
    
//     var states = new Object() ; 
    
//     for( var index in result ){
//         let state = result[index].get({plain: true});
//         var stateName = state.state.toUpperCase();
//         states[ stateName ] = state.id;
//     }
    
    
//     console.log(states);
    
// } );


// sessionHostDao.getSessionForHost( 'testshost@soprasteria.com' ).then( (result) => {
//     console.log(result);
// } )

// session.findAll( { where : { digilabId : [1,2] , stateId : 10 } , include : [ sessionTopic , guest , sessionHost ] ,  order : [ ['startDateTime' , 'DESC'] ]} )
// .then( result => console.log(JSON.stringify( result.filter( (session) => !session.get('SessionHost') ) , null , '\t' ))  )
// .catch( error => console.log( error.parent.message ) ); 

// sessionDao.get