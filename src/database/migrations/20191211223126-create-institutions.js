module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('institutions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          max: 50,
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          max: 200,
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('institutions');
  },
};
