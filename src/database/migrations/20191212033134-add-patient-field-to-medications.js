module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('medications', 'patient_id', {
      type: Sequelize.INTEGER,
      references: { model: 'patients', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('medications', 'patient_id');
  },
};
