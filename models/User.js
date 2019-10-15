'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    //One user has many products
    User.hasMany(models.Product, { as: 'products', foreignKey: 'userId' });
    //One user has many Task
    User.hasMany(models.Task, { as: 'tasks', foreignKey: 'userId' });
  };
  return User;
};