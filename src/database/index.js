import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Institution from '../app/models/Institution';
import Department from '../app/models/Department';
import Employees from '../app/models/Employees';
import Patient from '../app/models/Patient';
import Medication from '../app/models/Medication';
import Responsible from '../app/models/Responsible';

import databaseConfig from '../config/database';

const models = [
  User,
  File,
  Institution,
  Department,
  Employees,
  Patient,
  Medication,
  Responsible,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
