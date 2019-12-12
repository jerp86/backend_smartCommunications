import Sequelize, { Model } from 'sequelize';

class Medication extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        dosage: Sequelize.STRING,
        class: Sequelize.STRING,
        startDate: Sequelize.DATE,
        hour: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });
  }
}

export default Medication;
