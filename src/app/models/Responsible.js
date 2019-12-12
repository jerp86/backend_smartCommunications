import Sequelize, { Model } from 'sequelize';

class Responsible extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        phone: Sequelize.STRING,
        kinship: Sequelize.STRING,
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

export default Responsible;
