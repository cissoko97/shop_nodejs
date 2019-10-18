'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*    
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.
    Example:
    */
    return queryInterface.addColumn('products', 'quantity', Sequelize.INTEGER, {
      after: 'issolid' // after option is only supported by MySQL
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.removeColumn('products', 'quantity');
  }
};
