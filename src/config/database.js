module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'smart',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
