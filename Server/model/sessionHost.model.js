'use strict';
module.exports = (sequelize, DataTypes) => {
    var SessionHost = sequelize.define('SessionHost', {
        id: { 
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        sessionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: { type : DataTypes.STRING },
        email: { type : DataTypes.STRING }
    }, {
        timestamps : false,
        freezeTableName : true
    });

    SessionHost.associate = function(models) {};
    return SessionHost;
};
