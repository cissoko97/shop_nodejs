'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    issolid: DataTypes.BOOLEAN,
    quantity: DataTypes.INTEGER,
  }, {
    getterMethods: {
      getTotalPrice() {
        return this.getDataValue('price') * this.getDataValue('quantity');
      }
    }
  });
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User, {

    });
  };
  return Product;
};