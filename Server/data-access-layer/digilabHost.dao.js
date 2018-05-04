module.exports =  ( digilabHostModel )  => {
    
    var DigilabHostDao = {}; 

    DigilabHostDao.getDigilabIdForHost = ( email ) => {
        return new Promise( (resolve,reject) => {
            digilabHostModel
                .findAll( { where : { email } } )
                .then( result => {
                    if( result ) {
                        let ids = [];
                        result.forEach(digilab => {
                            ids.push( digilab.get('digilabId') )
                        });
                        resolve( ids );
                    }
                    resolve( [] );
                } )
                .catch( error => reject( error ) );
        });
    }

    return DigilabHostDao;
}