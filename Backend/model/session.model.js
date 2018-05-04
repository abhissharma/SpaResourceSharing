'use strict';
module.exports = (sequelize, DataTypes) => {
  
    var Session = sequelize.define('DigiSession', {
    
    id: {  type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    name: { type : DataTypes.STRING, allowNull : false },
    initiatorEmail: { type : DataTypes.STRING, allowNull : false }, 
    digilabId: { type: DataTypes.INTEGER, allowNull : false },
    
    startDateTime: { type: DataTypes.DATE },
    endDateTime: { type: DataTypes.DATE },

    stateId: { type: DataTypes.INTEGER  },
    initiatorName: { type: DataTypes.STRING },
    duration: { type: DataTypes.INTEGER },
    companyId: { type: DataTypes.INTEGER ,  },
    reason: { type: DataTypes.STRING},

    mailToReceptionistSent : { type: DataTypes.BOOLEAN },
    mailToGuestSent : { type: DataTypes.BOOLEAN },
    modifiedOn: { type: DataTypes.DATE, allowNull: false },

    preBookExpiryTime : { type: DataTypes.INTEGER, allowNull : false },
    description: { type: DataTypes.STRING },
    reminderMailSent : { type : DataTypes.BOOLEAN }, 
    digilabSpaceId: { type: DataTypes.INTEGER }
     
  }, {
    timestamps : false,
    freezeTableName : true
  });
  Session.associate = function(models) {
    Session.hasMany( models.SessionTopic , { foreignKey: 'digiSessionId' } );
    Session.hasMany( models.Guest , { foreignKey: 'sessionId' } );
    Session.hasOne( models.SessionHost , { foreignKey: 'sessionId' } );
    // Session.belongsTo( models.SessionState , { foreignKey : 'stateId' , targetKey : 'id' } );
    // User.belongsTo(UserRole, {as: 'role'}); // Adds roleId to user rather than userRoleId
  };
  return Session;
  
};