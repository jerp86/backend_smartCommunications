module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('responsible', {
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
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 10,
          max: 12,
        },
      },
      kinship: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          max: 45,
        },
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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
    return queryInterface.dropTable('responsible');
  },
};
