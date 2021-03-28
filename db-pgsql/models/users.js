module.exports = (sequelize, DataTypes) => sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.CHAR(128),
    allowNull: false,
  },
  password: {
    type: DataTypes.CHAR(60),
    allowNull: false,
  },
  resetpasswordtoken: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  resetpasswordexpires: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'users',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: 'users_pkey',
      unique: true,
      fields: [
        { name: 'id' },
      ],
    },
  ],
});
