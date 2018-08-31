/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('accounts', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50)
    },
  }, {
      tableName: 'accounts',
      timestamps: false
    });
};
