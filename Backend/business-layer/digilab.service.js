valiadateDigilabObject = ( digilab ) =>{
    return true;
}

module.exports =  ( digilabDao )  => {
    
    var DigilabServices= {};
    
    /**
    * Get all the digilabs 
    * Return an empty array if null
    */
    DigilabServices.getAllDigilabs = ( requestBody ) => {
        return new Promise( ( resolve,reject ) => {
            digilabDao.getDigilabs (  )
            .then( (result) => {
                resolve( result );
            } , (error) => {
                reject(error);
            } )
        } );
    };

    DigilabServices.addDigilab = ( requestBody ) => {
        return new Promise( ( resolve , reject ) => {
            var newDigilab = requestBody;
            var isValid = valiadateDigilabObject( newDigilab );
            if(isValid){
                digilabDao.getLatestId()
                    .then( ( id ) => {
                        newDigilab.id = id + 1;
                        newDigilab.monday = false;
                        newDigilab.tuesday = false;
                        newDigilab.wednesday = false;
                        newDigilab.thursday = false;
                        newDigilab.friday = false;
                        return digilabDao.addDigilab(newDigilab);
                    } )
                    .then( (newDigilab) => {
                        return digilabDao.getDigilabForId( newDigilab.get('id') );
                    }  )
                    .then( (newDigilab) => {
                        resolve( newDigilab.get( { plain: 'true' }) );
                    }  )
                    .catch( error => {
                        if( error.message )
                            reject('Something went wrong, please try again');
                        else
                            reject(error)
                    } );
            }
            else{
                reject( 'Invalid Params' );
            }
        }  );
    }

    DigilabServices.updateDigilab = ( requestParam , requestBody ) => {
        return new Promise( ( resolve , reject ) => {
            var updatedDigilab = requestBody;
            var isValid = valiadateDigilabObject( updatedDigilab );
            if(isValid){
                digilabDao.updateDigilabForId( requestParam , updatedDigilab )
                    .then( updatedDigilab => resolve(updatedDigilab) )
                    .catch( error => reject(error) );
            }
            else{
                reject( 'Invalid Params' );
            }
        } );
    }

    return DigilabServices;

};