module.exports = {
  up: (queryInterface, Sequelize) => {
    // adicionando uma coluna na tabela já criada
    return queryInterface.addColumn(
      'employees', // nome da Tabela para ser adicionada a coluna
      'avatar_id', // nome da nova coluna
      {
        // detalhes sobre a coluna
        type: Sequelize.INTEGER, // tipo da coluna
        references: { model: 'files', key: 'id' }, // foreing key/chave estrangeira
        onUpdate: 'CASCADE', // caso seja atualizado, o que acontece?
        onDelete: 'SET NULL', // caso apagado, o que acontece?
        allowNull: true, // o campo pode ser nulo
      }
    );
  },

  down: queryInterface => {
    // remove da 'TABELA' a 'COLUNA'
    return queryInterface.removeColumn('employees', 'avatar_id');
  },
};
