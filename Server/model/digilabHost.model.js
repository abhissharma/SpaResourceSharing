'use strict';
module.exports = (sequelize, DataTypes) => {
  var DigilabHost = sequelize.define('DigilabHost', {
    id : { 
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    name : { 
      type : DataTypes.STRING, 
    },
    email : { 
      type : DataTypes.STRING, 
      allowNull : false
    } ,
    contact : { 
        type : DataTypes.STRING, 
    } ,
    digilabId : { 
        type : DataTypes.INTEGER,
        allowNull : false
    }
  }, {
    timestamps : false,
    freezeTableName : true
  });
  DigilabHost.associate = function(models) {
  };
  return DigilabHost;
};
