module.exports =  ( sessionStateModel )  => {
    
    var SessionStateDao = {}; 

    SessionStateDao.getStates = () => {
        return new Promise( (resolve,reject) => {
            sessionStateModel
                .findAll(  )
                .then( result => resolve(result)  )
                .catch( error => reject( error.parent.message ) );
        });
    }

    return SessionStateDao
}