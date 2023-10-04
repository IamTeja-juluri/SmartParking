'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobileNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      locationName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      slot: {
        type: Sequelize.STRING,
        allowNull:false
      },
      vehicleNumber: {
        type: Sequelize.STRING,
        allowNull:false
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cardNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cvv: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      expiryDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};