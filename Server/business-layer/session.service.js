validateSessionObject = ( session ) => {
    return true;
}

module.exports = ( sessionDao , sessionStateDao , sessionHostDao , digilabHostDao , digilabDao ) => {
    
    var moment = require('moment');

    var SessionServices = {};

    var states = [] ;

    sessionStateDao.getStates()
        .then( (result) => {
            for( var index in result ){
                let state = result[index].get({plain: true});
                states[index] = state;
            }
            console.log(states);
        }  
    );

    getStateForStateId = (id) => {
        return states.filter( (state) => state.id == id )[0].state;
    }
    
    getStateIdForState = (stateTitle) => {
        return states.filter( (state) => state.state === stateTitle )[0].id;
    }

    setStates = (sessions) => {
        for ( var index in sessions ){
            let session = sessions[index];
            let stateId = session.get('stateId');
            session.set( 'stateId' , getStateForStateId(stateId) );
            sessions[index] = session;
        }  
        return sessions;
    }

    
    SessionServices.getSessionsForUser = ( requestBody ) => {
        return new Promise((resolve, reject) => {

            let usertype = requestBody.usertype;
            let email = requestBody.email;
            let digilabId = requestBody.digilabId;

            var sessionsQuery = [ ]

            if( usertype === 'Initiator'  )
                sessionsQuery.push( getSessionsForInitiator(email) );
            else if( usertype === 'Host' || usertype === 'Admin' ) {
                sessionsQuery.push( getSessionsForInitiator(email) );
                sessionsQuery.push( getSessionsForHost(email) );
                sessionsQuery.push( getSubmittedSessionForDigilab(email) );
            }
            else if( usertype === 'Receptionist' ){
                sessionsQuery.push( getSessionForReceptionist(email) );
            }
            else{
                reject('Invalid user type');
            }

            Promise
                .all(sessionsQuery)
                .then( (sessions) => {
                    let response = {} ;
                    if( usertype !== 'Receptionist' ) {
                        response.ForInitiator = setStates( sessions[0]);
                        if( usertype === 'Host' || usertype === 'Admin' ) {
                            response.ForHost = setStates( sessions[1].concat( sessions[2].filter( (session) => !session.get('SessionHost') )  ));
                            response.ForHost.sort( (a,b) => a.get('startDateTime') > b.get('startDateTime') )
                        }
                    } else {
                        response.ForReceptionist = setStates( sessions[0] );
                    }
                    resolve(response);
                } )
                .catch( error => reject(error) );

        });
    }

    getSessionsForInitiator = ( email ) => {
        return sessionDao.getSessionsForInitiatorEmail(email)
    }

    getSessionsForHost = ( email ) => {
        let ids = [];
        return new Promise( (resolve, reject) => { 
            sessionHostDao
                .getSessionForHost(email)
                .then( (result) => {
                    for( var index in result ){
                        ids.push( result[index].get('sessionId') );
                    }
                    if( ids.length === 0 )
                        resolve( [] );
                    else
                        return sessionDao.getSessionsForIds( ids );
                } )
                .then( sessions => resolve(sessions) )
                .catch( error => reject(error) ) ;
        } );
    }

    getSubmittedSessionForDigilab = ( email ) => {
        return new Promise( (resolve, reject) => {
            
            digilabHostDao.getDigilabIdForHost( email )
                .then( (ids) =>{ 
                    if( ids.length > 0 )
                        return sessionDao.getSessionForDigilab(ids , getStateIdForState('Submitted'));
                    else
                        resolve([]);
                } )    
                .then( sessions => resolve(sessions) )
                .catch( error => reject(error) ) ;
        } );
    }

    getSessionForReceptionist = ( email ) => {
        return new Promise( (resolve, reject) => {
            
            digilabDao.getDigilabsForReceptionistEmail( email )
                .then( (digilabs) =>{ 
                    if( digilabs.length > 0 ) {
                        let ids = [];
                        digilabs.forEach( (digilab) => {
                            ids.push( digilab.get('id') )
                        } );
                        return sessionDao.getSessionForDigilab(ids , getStateIdForState('Confirmed'));
                    }
                    else
                        resolve([]);
                } )    
                .then( sessions => resolve(sessions) )
                .catch( error => reject(error) ) ;
        } );
    }

    SessionServices.addSession = (requestBody) => {
        return new Promise((resolve, reject) => {
            var newSession = requestBody;
            var isValid = validateSessionObject(newSession);
            if(isValid){
                sessionDao.getLatestId()
                .then((id) => {
                    newSession.id = id+1;
                    newSession.modifiedOn = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
                    newSession.stateId = getStateIdForState( newSession.stateId );
                    newSession.preBookExpiryTime = 1;
                    return sessionDao.addSession(newSession);
                })
                .then((newSession) => {
                    return sessionDao.getSessionForId( newSession.get('id') );
                })
                .then((newSession) => {
                    newSession.set( 'stateId' , getStateForStateId(newSession.get('stateId')) );
                    resolve(newSession.get({plain: 'true'}));
                })
                .catch((error) => {
                    reject(error);
                });
            }
            else{
                reject('Invalid params');
            }
        });
    };

    SessionServices.updateSession = (requestParam, requestBody) => {
        return new Promise((resolve, reject) => {
            var updatedSession = requestBody;
            var isValid = validateSessionObject(updatedSession);
            if(isValid){
                updatedSession.stateId = getStateIdForState( updatedSession.stateId )
                sessionDao
                    .updateSessionForId(requestParam, requestBody)
                    .then( updatedSession =>{ 
                        updatedSession.set( 'stateId' , getStateForStateId(updatedSession.get('stateId')) );
                        resolve(updatedSession) 
                    })
                    .catch(error => reject(error));
            }
            else{
                reject('Invalid params.');
            }
        });
    };

    return SessionServices;
}; 