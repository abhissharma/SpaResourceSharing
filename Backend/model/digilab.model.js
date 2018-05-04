'use strict';
module.exports = (sequelize, DataTypes) => {
  
    var Digilab = sequelize.define('Digilab', {
    
    id : {  type : DataTypes.INTEGER , primaryKey : true , autoIncrement : true } ,
    name: { type : DataTypes.STRING , allowNull : false } ,
    receptionEmail: { type : DataTypes.STRING , allowNull : false } , 
    locationLat : { type : DataTypes.FLOAT , allowNull : false } , 
    locationLong : { type : DataTypes.FLOAT , allowNull : false } ,
    
    isEmailNotificationEnabled : { type : DataTypes.BOOLEAN , allowNull : false } ,
    isPushNotificationEnabled : { type : DataTypes.BOOLEAN , allowNull : false } ,
    isOpenForBusiness : { type : DataTypes.BOOLEAN , allowNull : false } ,
    feedBackDelayTime : { type : DataTypes.INTEGER , allowNull : false } ,
    preBookExpiryTime : { type : DataTypes.INTEGER , allowNull : false } ,
    
    monday : { type : DataTypes.BOOLEAN , allowNull : false } ,
    tuesday : { type : DataTypes.BOOLEAN , allowNull : false } ,
    wednesday : { type : DataTypes.BOOLEAN , allowNull : false } ,
    thursday : { type : DataTypes.BOOLEAN , allowNull : false } ,
    friday : { type : DataTypes.BOOLEAN , allowNull : false } , 
    
    startTime : DataTypes.TIME , 
    endTime : DataTypes.TIME , 
    receptionistMailDeliveryHours : DataTypes.INTEGER ,
    question1 : DataTypes.STRING , 
    question2 : DataTypes.STRING , 
    email : DataTypes.STRING , 
    timezone : DataTypes.STRING , 
    timezoneId : DataTypes.STRING , 

  }, {
    
    timestamps : false,
    freezeTableName : true
  
  });
  Digilab.associate = function(models) {
    Digilab.hasMany( models.Topic , { foreignKey : 'digilabId' } );
    Digilab.hasMany( models.DigilabHost , { foreignKey : 'digilabId'  } );
  };
  return Digilab;
  
};