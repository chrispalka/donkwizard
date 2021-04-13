'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recent.init({
    recents: DataTypes.STRING(500),
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Recent',
  });
  return Recent;
};