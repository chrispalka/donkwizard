'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Monitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Monitor.init({
    product: DataTypes.STRING(500),
    user_id: DataTypes.UUID,
    run: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Monitor',
    timestamps: false,
  });
  return Monitor;
};