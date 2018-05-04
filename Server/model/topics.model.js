'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    id : { 
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    name: { 
      type : DataTypes.STRING, 
      allowNull : false
    },
    digilabId: { 
      type : DataTypes.INTEGER, 
      allowNull : false
    }
  }, {
    timestamps : false,
    freezeTableName : true
  });
  Topic.associate = function(models) {
  };
  return Topic;
};
