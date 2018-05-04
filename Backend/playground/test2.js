
var digilabJson = `{
    "id": 13,
    "name": "Test Digilab 2",
    "receptionEmail": "testreceptionist3@gmail.com",
    "locationLat": 0,
    "locationLong": 0,
    "isEmailNotificationEnabled": true,
    "isPushNotificationEnabled": true,
    "isOpenForBusiness": true,
    "feedBackDelayTime": 0,
    "preBookExpiryTime": 0,
    "monday": false,
    "tuesday": false,
    "wednesday": false,
    "thursday": false,
    "friday": false,
    "startTime": null,
    "endTime": null,
    "receptionistMailDeliveryHours": null,
    "question1": null,
    "question2": null,
    "email": null,
    "timezone": null,
    "timezoneId": null ,
    "Topics": [
        {
            "id": 15,
            "name": "Test topic 15",
            "digilabId": 13
        } 
    ] ,
    "DigilabHosts" : [
        {
            "email": "testdHost2@soprasteria.com"
        }
    ]
}`

var digilab = JSON.parse(digilabJson);


valiadateDigilabObject = ( digilab ) =>{
    if( !digilab.name ||
        !digilab.receptionEmail ||
        digilab.locationLat === undefined ||
        digilab.locationLong === undefined ||
        digilab.isEmailNotificationEnabled === undefined ||
        digilab.isPushNotificationEnabled === undefined ||
        digilab.feedBackDelayTime === undefined ||
        digilab.preBookExpiryTime === undefined ||
        digilab.isOpenForBusiness === undefined  ) 
    {
            return false;
    }

    if( !digilab.Topics )

    return true;
}

console.log( valiadateDigilabObject(digilab) );
