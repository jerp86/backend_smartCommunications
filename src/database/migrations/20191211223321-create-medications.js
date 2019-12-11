module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('medications', {
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
          max: 45,
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          max: 200,
        },
      },
      dosage: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          max: 45,
        },
      },
      class: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          max: 45,
        },
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hour: {
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
    return queryInterface.dropTable('medications');
  },
};
