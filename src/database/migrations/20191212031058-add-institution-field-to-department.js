module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('departments', 'institution_id', {
      type: Sequelize.INTEGER,
      references: { model: 'institutions', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('departments', 'institution_id');
  },
};
