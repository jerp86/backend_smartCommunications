import * as Yup from 'yup';

import Employees from '../models/Employees';
import User from '../models/User';

class EmployeeController {
  async index(req, res) {
    const employees = await Employees.findAll();

    return res.json(employees);
  }

  async show(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const employees = await Employees.findByPk(id);

    if (!employees)
      return res.status(400).json({ error: 'Employee does not exists' });

    return res.json(employees);
  }

  async store(req, res) {
    /**
     * Validating input data
     */
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

    /**
     * Check if userId is a provider
     */
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create a record as an admin.' });
    }

    /**
     * Check if employee already exists
     */
    let employee = await Employees.findOne({
      where: { name: req.body.name },
    });

    if (!employee) {
      employee = await Employees.create(req.body);
    }

    const { id, name } = employee;

    return res.json({ id, name, function: employee.function });
  }

  async update(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().max(50),
      function: Yup.string().max(45),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * If 'id' is different from 'userId', make sure 'userId' is an admin
     */
    if (req.userId !== req.body.id) {
      const isProvider = await User.findOne({
        where: { id: req.userId, provider: true },
      });

      if (!isProvider) {
        return res
          .status(401)
          .json({ error: 'You can only create a record as an admin.' });
      }
    }

    const { id, name } = req.body;

    const employee = await Employees.findByPk(id);

    /**
     * Check if employee already exists
     */
    if (!employees) {
      return res.status(400).json({ error: 'Employee does not exists' });
    }

    /**
     * Verify new name already exists
     */
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
