'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    mobileNumber: {
      type:DataTypes.INTEGER,
      allowNull:false,
      unique:true
    },
    locationName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    slot:{ 
      type:DataTypes.STRING,
      allowNull:false
    },
    vehicleNumber: {
      type:DataTypes.STRING,
      allowNull:false
    },
    duration: {
      type:DataTypes.STRING,
      allowNull:false
    },
    cardNumber: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    cvv: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    expiryDate: {
      type:DataTypes.STRING,
      allowNull:false
    },
    amount:{ 
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};