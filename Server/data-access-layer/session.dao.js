module.exports =  ( sequelize , sessionModel , sessionTopicModel , guestModel , sessionHostModel )  => {
    
    var SessionDao = {};
    
    SessionDao.getSessionsForInitiatorEmail = ( initiatorEmail ) => {
        return new Promise( (resolve,reject) => {
            sessionModel
                .findAll( { where : { initiatorEmail } , include : [ sessionTopicModel , guestModel , sessionHostModel ] ,  order : [ ['startDateTime' , 'DESC'] ]} )
                .then( result => resolve(result)  )
                .catch( error => reject( error.parent.message ) );
        });
    }

    SessionDao.getSessionsForIds = ( ids ) => {
        return new Promise( (resolve,reject) => { 
            sessionModel
                .findAll( { where : { id : ids } , include : [ sessionTopicModel , guestModel , sessionHostModel ] ,  order : [ ['startDateTime' , 'DESC'] ]} )
                .then( result => resolve(result)  )
                .catch( error => reject( error.parent.message ) );
        } );
    }
    
    SessionDao.getSessionForDigilab = ( digilabId , stateId ) => {
        return new Promise( (resolve,reject) => { 
            sessionModel
                .findAll( { where : { digilabId , stateId } , include : [ sessionTopicModel , guestModel , sessionHostModel ] ,  order : [ ['startDateTime' , 'DESC'] ]} )
                .then( result => resolve( result ) )
                .catch( error => reject( error.parent.message ) );
        } );
    }
    
    SessionDao.getLatestId = () => {
        return new Promise( (resolve,reject) => {
            sessionModel.max('id')
                .then( id => resolve(id) )
                .catch( error => reject(error.parent.message) );
        } );
    }

    SessionDao.addSession = ( session ) => {
        return new Promise( (resolve,reject) => {
            sessionModel.create( session , { include : [ sessionTopicModel , guestModel ] } )
                .then( session =>  resolve( session ) )
                .catch( error => reject ( error ) )
        } );
    }

    SessionDao.getSessionForId = ( Id ) => {
        return new Promise( (resolve,reject) => {
            sessionModel.
                findOne( { where : { Id } , include : [ sessionTopicModel , guestModel ] } )
                .then( (session) => {
                    if ( session )
                        resolve( session );
                    else
                        reject( 'Session does not exist' );
                } , (error) => {
                    reject ( error.parent.message ); 
                });
        } );
    };

    SessionDao.updateSessionForId = ( id , updatedSession ) => {
        
        return new Promise( (resolve,reject) => {
            
            sequelize.transaction( (t) => {
                return sessionModel
                    .findOne( { where : { id } , include : [ sessionTopicModel , guestModel , sessionHostModel ] } ) 
                    .then( ( data ) => {
                        let deletions = [];
                        data.SessionTopics.forEach(topic => {
                            let deletion = topic.destroy( { transaction : t } );
                            deletions.push(deletion);
                        });
                        data.Guests.forEach( guest => {
                            let deletion = guest.destroy( { transaction : t } );
                            deletions.push(deletion);
                        });
                        if( data.SessionHost )
                            deletions.push( data.SessionHost.destroy( { transaction : t } ) );
                        let update = data.update( updatedSession , { transaction : t } );
                        return Promise.all( [deletions , update ] );
                    } )
                    .then( (data) => {
                        let additions = [];
                        updatedSession.SessionTopics.forEach( topic => {
                            topic.digiSessionId = id;
                            let additon = sessionTopicModel.create( topic , { transaction : t } );
                            additions.push( additon );
                        } ) ;
                        updatedSession.Guests.forEach( guest => {
                            guest.sessionId = id;
                            let additon = guestModel.create( guest , { transaction : t } );
                            additions.push( additon );
                        } ) ;
                        if( updatedSession.SessionHost ){
                            updatedSession.SessionHost.sessionId = id;
                            let additon = sessionHostModel.create( updatedSession.SessionHost , { transaction : t } );
                            additions.push( additon );
                        }
                        return Promise.all( additions );
                    } ) 
                    .then( data => {
                        return sessionModel.findOne( { where : { id } , include : [ sessionTopicModel , guestModel , sessionHostModel ] , transaction : t } );
                    } );
            } ).then( ( newSession ) => {
                resolve( newSession );
            } ).catch( (err) => {
                reject( err );
            } );

        } );
       
    }

    return SessionDao;

};