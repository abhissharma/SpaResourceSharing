module.exports =  ( digilabServices )  => {
    
    var DigilabController= {};
    var logger = require('../error-handling-logger/Logger');
    const shortid = require('shortid');

    /**
     * route to check if the user is valid or not
     */
    DigilabController.getAllDigilabs = (req, res) => {
        let txnID = shortid.generate();
        var requestBody = req.body;
        logger.logMessage("Request Received from : GET/digilab" + "|" + requestBody, logger.LOG_LEVEL.verbose, 'REQUEST', txnID);
        digilabServices.getAllDigilabs(requestBody).then((result) => {
            var responseJson = {
                success : true,
                payload : result
            }
            res.status(200).send(responseJson);
            logger.logMessage("Response Sent for : GET/digilab" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } , (err) => {
            var responseJson = {
                success : false,
                payload : {},
                error : {
                    error_message : err
                }
            }
            res.status(404).send(responseJson);
            logger.logMessage("Response Sent for : GET/digilab" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } ); 
    };

    DigilabController.addDigilab = (req , res) => {
        let txnID = shortid.generate();
        var requestBody = req.body;
        logger.logMessage("Request Received from : POST/digilab" + "|" + requestBody, logger.LOG_LEVEL.verbose, 'REQUEST', txnID);
        digilabServices.addDigilab(requestBody).then((result) => {
            var responseJson = {
                success : true,
                payload : result
            }
            res.status(200).send(responseJson);
            logger.logMessage("Response Sent for : POST/digilab" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } , (err) => {
            var responseJson = {
                success : false,
                payload : {},
                error : {
                    error_message : err
                }
            }
            res.status(404).send(responseJson);
            logger.logMessage("Response Sent for : POST/digilab" + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } ); 
    };

    DigilabController.updateDigilab = (req, res) => {
        let txnID = shortid.generate();
        var requestBody = req.body;
        logger.logMessage("Request Received from : PUT/digilab/" + req.params.id + " |" + requestBody, logger.LOG_LEVEL.verbose, 'REQUEST', txnID);
        if(isNaN(req.params.id)){
            var responseJson = {
                success : false,
                payload : {},
                error : {
                    error_message : 'Invalid digilab id'
                }
            }
            res.status(404).send(responseJson);
            logger.logMessage("Response Sent for : PUT/digilab/" + req.params.id + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
            return;
        }
        digilabServices.updateDigilab(req.params.id, requestBody).then((result) => {
            var responseJson = {
                success : true,
                payload : result
            }
            res.status(200).send(responseJson);
            logger.logMessage("Response Sent for : PUT/digilab/" + req.params.id + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } , (err) => {
            var responseJson = {
                success : false,
                payload : {},
                error : {
                    error_message : err
                }
            }
            res.status(404).send(responseJson );
            logger.logMessage("Response Sent for : PUT/digilab/" + req.params.id + " |" + JSON.stringify(responseJson), logger.LOG_LEVEL.verbose, 'RESPONSE', txnID);
        } ); 
    }

    return DigilabController;

};