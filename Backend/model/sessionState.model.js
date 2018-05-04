'use strict';
module.exports = (sequelize, DataTypes) => {
    var SessionState = sequelize.define('SessionState', {
          id: { 
             type : DataTypes.INTEGER,
             primaryKey : true,
             autoIncrement : true
          },
          state: {
             type: DataTypes.STRING,
             allowNull: false
          },
    }, 
    {
        timestamps : false,
        freezeTableName : true
    });

    SessionState.associate = function(models) {
        // SessionState.hasMany( models.DigiSession );
    };
    return SessionState;
};
