'use strict';
module.exports = (sequelize, DataTypes) => {
    var Guest = sequelize.define('Guest', {
        id: { 
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        sessionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: { type : DataTypes.STRING },
        email: { type : DataTypes.STRING },
        contact: { type : DataTypes.STRING },
        company: { type : DataTypes.STRING }
    }, 
    {
        timestamps : false,
        freezeTableName : true
    });

    Guest.associate = function(models) {};
    return Guest;
};