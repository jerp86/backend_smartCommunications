import * as Yup from 'yup';

import Employees from '../models/Employees';
import User from '../models/User';

class EmployeeController {
  async index(req, res) {
    const employees = await Employees.findAll();

    return res.json(employees);
  }

  async show(req, res) {
    const { id } = req.params;
    const employees = await Employees.findByPk(id);

    if (!employees)
      return res.status(400).json({ error: 'Employee does not exists' });

    return res.json(employees);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .max(50)
        .required(),
      function: Yup.string()
        .max(45)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    if (user.provider === false) {
      return res.status(401).json({ error: 'User does not have permission' });
    }

    let employees = await Employees.findOne({
      where: { name: req.body.name },
    });

    if (!employees) {
      employees = await Employees.create(req.body);
    }

    const { id, name } = employees;

    return res.json({ id, name, function: employees.function });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.integer().required(),
      name: Yup.string().max(50),
      function: Yup.string().max(45),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    if (user.provider === false) {
      return res.status(401).json({ error: 'User does not have permission' });
    }

    const { id, name } = req.body;

    const employee = await Employees.findByPk(id);

    if (name !== employee.name) {
      const employeeExists = await Employees.findOne({ where: { name } });

      if (employeeExists) {
        return res.status(400).json({ error: 'Employee already exists.' });
      }
    }

    await employee.update(req.body);

    return res.json({ id, name, function: employee.function });
  }
}

export default new EmployeeController();
