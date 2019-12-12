import Sequelize, { Model } from 'sequelize';

class Employees extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        function: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department',
    });
  }
}

export default Employees;
