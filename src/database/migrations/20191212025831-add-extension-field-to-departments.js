module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('departments', 'extension', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: queryInterface => {
    // remove da 'TABELA' a 'COLUNA'
    return queryInterface.removeColumn('departments', 'extension');
  },
};
