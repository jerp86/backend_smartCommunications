module.exports = {
  dialect: 'postgress',
  host: 'localhost',
  username: 'postgress',
  password: 'docker',
  database: 'smart',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
