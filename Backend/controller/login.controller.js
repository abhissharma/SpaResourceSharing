module.exports =  ( loginServices )  => {
    
    var LoginController= {};
    var logger = require('../error-handling-logger/Logger');
    const shortid = require('shortid');

    /**
     * route to check if the user is valid or not
     */
    LoginController.authenticateUser = ( req , res ) => {
        
        let txnID = shortid.generate();

        var requestBody = req.body;

        logger.logMessage("Request Received from : /login" + "|" + requestBody, logger.LOG_LEVEL.verbose, 'REQUEST', txnID);

        loginServices.authenticate( requestBody ).then( ( result ) => {
            ;
            var responseJson = {
                success : true,
                payload : result
            }
            
            res.status(200).send( responseJson );
            logger.logMessage("Response Sent for : /login" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        
        } , ( err ) => {

            var responseJson = {
                success : false,
                payload : {},
                error : {
                    error_message : err
                }
            }

            res.status(200).send( responseJson );
            logger.logMessage("Response Sent for : /login" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        
        } ); 

    };

    return LoginController;

};