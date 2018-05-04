module.exports =  (  )  => {
    
    var DigilabDao = {};

    digilabs = require('../static-data/digilabs.json');
    
    // DigilabDao.getDigilabsForReceptionistEmail = ( receptionEmail ) => {
    //     return new Promise( (resolve,reject) => {
    //         digilabModel.
    //             findAll( { where : { receptionEmail }  } )
    //             .then( (digilabs) => resolve(digilabs) )
    //             .catch( (error) => reject (error) );
    //     } );
    // }

    // DigilabDao.getDigilabForId = ( Id ) => {
    //     return new Promise( (resolve,reject) => {
    //         digilabModel.
    //             findOne( { where : { Id } , include : [ topicModel , digilabHostModel ] } )
    //             .then( (digilab) => {
    //                 if ( digilab )
    //                     resolve( digilab );
    //                 else
    //                     reject( 'Digilab does not exist' );
    //             } , (error) => {
    //                 reject ( error.parent.message ); 
    //             });
    //     } );
    // };

    DigilabDao.getDigilabs = (  ) => {
        return new Promise( (resolve,reject) => {
            resolve(digilabs);
        } );
    };

    // DigilabDao.addDigilab = ( digilab ) => {
    //     return new Promise( (resolve,reject) => {
    //         digilabModel.create( digilab , { include : [ digilabHostModel , topicModel ] } )
    //             .then( (digilab) => {
    //                 resolve( digilab );
    //             } , (error) => {
    //                 reject ( error.parent.message ); 
    //             } )
    //     } );
    // }

    // DigilabDao.getLatestId = () => {
    //     return new Promise( (resolve,reject) => {
    //         digilabModel.max('id')
    //             .then( id => resolve(id) )
    //             .catch( error => reject(error.parent.message) );
    //     } );
    // }

    // DigilabDao.updateDigilabForId = ( id , updatedDigilab ) => {
        
    //     return new Promise( (resolve,reject) => {
            
    //         sequelize.transaction( (t) => {
    //             return digilabModel
    //                 .findOne( { where : { id } , include : [ topicModel , digilabHostModel ] } ) 
    //                 .then( ( result ) => {
    //                     let deletions = [];
    //                     result.Topics.forEach(topic => {
    //                         let deletion = topic.destroy( { transaction : t } );
    //                         deletions.push(deletion);
    //                     });
    //                     result.DigilabHosts.forEach( digilabHost => {
    //                         let deletion = digilabHost.destroy( { transaction : t } );
    //                         deletions.push(deletion);
    //                     });
    //                     let update = result.update( updatedDigilab , { transaction : t } );
    //                     return Promise.all( [deletions , update ] );
    //                 } )
    //                 .then( (result) => {
    //                     let additions = []
    //                     updatedDigilab.Topics.forEach( topic => {
    //                         topic.digilabId = id;
    //                         let additon = topicModel.create( topic , { transaction : t } );
    //                         additions.push( additon );
    //                     } ) ;
    //                     updatedDigilab.DigilabHosts.forEach( digilabHost => {
    //                         digilabHost.digilabId = id;
    //                         let additon = digilabHostModel.create( digilabHost , { transaction : t } );
    //                         additions.push( additon );
    //                     } ) ;
    //                     return Promise.all( additions );
    //                 } ) 
    //                 .then( result => {
    //                     return digilabModel.findOne( { where : { id } , include : [ topicModel , digilabHostModel ] , transaction : t } );
    //                 } );
    //         } ).then( ( newDigilab ) => {
    //             resolve( newDigilab );
    //         } ).catch( (err) => {
    //             reject( err );
    //         } );

    //     } );
       
    // }

    return DigilabDao;

};