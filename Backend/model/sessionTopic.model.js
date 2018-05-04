'use strict';
module.exports = (sequelize, DataTypes) => {
    var SessionTopic = sequelize.define('SessionTopic', {
          id: { 
             type : DataTypes.INTEGER,
             primaryKey : true,
             autoIncrement : true,
             allowNull: false
          },
          digiSessionId: { 
            type : DataTypes.INTEGER,
            allowNull: false
          },
          name: { 
            type: DataTypes.STRING 
          },
          digilabId: {
            type: DataTypes.INTEGER,
          }
    }, 
    {
        timestamps : false,
        freezeTableName : true
    });

    SessionTopic.associate = function(models) {};
    return SessionTopic;
};
