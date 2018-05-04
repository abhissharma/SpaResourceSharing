'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('USER_TYPE', {
    user_type : DataTypes.STRING,
    user_id : { 
      type : DataTypes.INTEGER,
      primaryKey : true
    },
    user_type_id : DataTypes.INTEGER,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps : false,
    freezeTableName : true
  });
  User.associate = function(models) {
  };
  return User;
};