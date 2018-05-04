module.exports =  ( usersModel )  => {
    
    var UsersDao = {};
    
    UsersDao.getUser = ( email , password ) => {
        
        return new Promise( (resolve,reject) => {
            usersModel.
                findAll( { where : { email , password } } )
                .then( (users) => {
                    
                    if ( users.length > 0 )
                        resolve( users[0].dataValues );
                    else
                        reject( 'User does not exist' );

                } , (error) => {
                    reject ( error.parent.message ); 
                });
        } );

    };

    return UsersDao;

};