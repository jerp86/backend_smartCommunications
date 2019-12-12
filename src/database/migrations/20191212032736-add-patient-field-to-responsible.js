module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('responsible', 'patient_id', {
      type: Sequelize.INTEGER,
      references: { model: 'patients', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('responsible', 'patient_id');
  },
};
