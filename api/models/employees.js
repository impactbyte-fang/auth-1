/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  let employees = sequelize.define('employees', {
    emp_no: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    testbro: {
      type: DataTypes.DATEONLY
    }
  }, {
    tableName: 'employees',
    timestamps: false
  });

  // employees.associate = function (models) {
  //   models.employees.hasMany(models.dept_emp, {
  //     foreignKey: 'emp_no'
  //   });
  // };

  return employees
};