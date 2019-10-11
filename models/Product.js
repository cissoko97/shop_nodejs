'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    slug: DataTypes.STRING,
    price: DataTypes.INTEGER,
    issolid: DataTypes.BOOLEAN
  }, {});
  Product.associate = function (models) {
    // Product belongs to User
    Product.belongsTo(models.User);
  };
  return product;
};