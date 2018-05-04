module.exports =  ( sessionHostModel )  => {
    
    var SessionHostDao = {}; 

    SessionHostDao.getSessionForHost = ( email ) => {
        return new Promise( (resolve,reject) => {
            sessionHostModel
                .findAll( { where : { email } } )
                .then( result => resolve(result)  )
                .catch( error => reject( error.parent.message ) );
        });
    }

    return SessionHostDao;
}