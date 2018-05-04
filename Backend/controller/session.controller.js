module.exports =  ( sessionServices )  => {
    
    var SessionController= {};
    var logger = require('../error-handling-logger/Logger');
    const shortid = require('shortid');


    SessionController.getSessions = ( req , res ) => {
        let txnID = shortid.generate();
        var requestBody = req.body;
        logger.logMessage("Request Received from : POST/session" + "|" + JSON.stringify(requestBody), logger.LOG_LEVEL.verbose, 'REQUEST', txnID);
        sessionServices.getSessionsForUser(requestBody).then((result) => {
            var responseJson = {
                success : true,
                payload : result
            }
            res.status(200).send( responseJson );
            logger.logMessage("Response Sent for : POST/session" + "|" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } , ( err ) => {
            var responseJson = {
                success : false,
                payload : {},
                error : {
                    error_message : err
                }
            }
            res.status(200).send( responseJson );
            logger.logMessage("Response Sent for : POST/session" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } ); 
    }

    /**
     * route to check if the user is valid or not
     */
    // SessionController.getConfirmedSessions = ( req , res ) => {
    //     let txnID = shortid.generate();
    //     var requestBody = req.body;
    //     logger.logMessage("Request Received from : GET/session" + "|" + requestBody, logger.LOG_LEVEL.verbose, 'REQUEST', txnID);
    //     sessionServices.getConfirmedSessions(requestBody).then((result) => {
    //         var responseJson = {
    //             success : true,
    //             payload : result
    //         }
    //         res.status(200).send( responseJson );
    //         logger.logMessage("Response Sent for : GET/session" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
    //     } , ( err ) => {
    //         var responseJson = {
    //             success : false,
    //             payload : {},
    //             error : {
    //                 error_message : err
    //             }
    //         }
    //         res.status(404).send( responseJson );
    //         logger.logMessage("Response Sent for : GET/session" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
    //     } ); 
    // };

    // SessionController.getArchiveSessions = ( req , res ) => {
    //     let txnID = shortid.generate();
    //     var requestBody = req.body;
    //     logger.logMessage("Request Received from : GET/session" + "|" + requestBody, logger.LOG_LEVEL.verbose, 'REQUEST', txnID);
    //     sessionServices.getAllSessions( requestBody ).then( ( result ) => {
    //         var responseJson = {
    //             success : true,
    //             payload : result
    //         }
    //         res.status(200).send( responseJson );
    //         logger.logMessage("Response Sent for : GET/session" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
    //     } , ( err ) => {
    //         var responseJson = {
    //             success : false,
    //             payload : {},
    //             error : {
    //                 error_message : err
    //             }
    //         }
    //         res.status(404).send( responseJson );
    //         logger.logMessage("Response Sent for : GET/session" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
    //     } ); 
    // };

    SessionController.addSession = ( req , res ) => {
        let txnID = shortid.generate();
        var requestBody = req.body;
        logger.logMessage("Request Received from : POST/session" + "|" + JSON.stringify(requestBody), logger.LOG_LEVEL.verbose, 'REQUEST', txnID);
        sessionServices.addSession( requestBody ).then( ( result ) => {
            var responseJson = {
                success : true,
                payload : result
            }
            res.status(200).send( responseJson );
            logger.logMessage("Response Sent for : POST/session" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } , ( err ) => {
            var responseJson = {
                success : false,
                payload : {},
                error : {
                    error_message : err
                }
            }
            res.status(200).send( responseJson );
            logger.logMessage("Response Sent for : POST/session" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } ); 
    };

    SessionController.updateSession = ( req , res ) => {
        let txnID = shortid.generate();
        var requestBody = req.body;
        logger.logMessage("Request Received from : PUT/session/" + req.params.id + " |" + JSON.stringify(requestBody), logger.LOG_LEVEL.verbose, 'REQUEST', txnID);
        if( isNaN(req.params.id) ){
            var responseJson = {
                success : false,
                payload : {},
                error : {
                    error_message : 'Invalid session id'
                }
            }
            res.status(200).send( responseJson );
            logger.logMessage("Response Sent for : PUT/session/" + req.params.id + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
            return;
        }
        sessionServices.updateSession( req.params.id , requestBody ).then( ( result ) => {
            var responseJson = {
                success : true,
                payload : result
            }
            res.status(200).send( responseJson );
            logger.logMessage("Response Sent for : PUT/session/" + req.params.id + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } , ( err ) => {
            var responseJson = {
                success : false,
                payload : {},
                error : {
                    error_message : err
                }
            }
            res.status(200).send( responseJson );
            logger.logMessage("Response Sent for : PUT/session/" + req.params.id + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } ); 
    }

    return SessionController;

};