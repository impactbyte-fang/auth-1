/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  let dept_emp = sequelize.define('dept_emp', {
    emp_no: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'emp_no'
      }
    },
    dept_no: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'departments',
        key: 'dept_no'
      }
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'dept_emp',
    timestamps: false
  });

  dept_emp.associate = function (models) {
    models.dept_emp.belongsTo(models.employees, {
      foreignKey: 'emp_no',
      targetKey: 'emp_no'
    });

    models.dept_emp.belongsTo(models.departments, {
      foreignKey: 'dept_no',
      targetKey: 'dept_no'
    });
  };

  return dept_emp
};