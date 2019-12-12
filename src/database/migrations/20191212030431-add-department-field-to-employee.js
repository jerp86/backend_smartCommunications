module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'department_id', {
      type: Sequelize.INTEGER,
      references: { model: 'departments', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('employees', 'department_id');
  },
};
