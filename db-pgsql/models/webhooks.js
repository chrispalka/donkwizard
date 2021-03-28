module.exports = (sequelize, DataTypes) => sequelize.define('webhooks', {
  webhook_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  webhook: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  sequelize,
  tableName: 'webhooks',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: 'webhooks_pkey1',
      unique: true,
      fields: [
        { name: 'webhook_id' },
      ],
    },
  ],
});
