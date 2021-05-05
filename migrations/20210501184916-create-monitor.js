'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Monitors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      product: {
        type: Sequelize.STRING
      },
      run: {
        type: Sequelize.BOOLEAN,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Monitors');
  }
};