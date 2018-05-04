module.exports =  (  )  => {
    
    var UsersDao = {};
    
    users = require('../static-data/users.json');

    UsersDao.getUser = ( email , password ) => {
        
        return new Promise( (resolve,reject) => {
            
            var matchedusers = users.filter( (user) => {
                if( user.email === email && user.password === password )
                    return true;
                else
                    return false;
            } )
            
            if( matchedusers.length > 0 )
                resolve(matchedusers[0]);
            else
                reject( 'User does not exist' );
        } );

    };

    return UsersDao;

};