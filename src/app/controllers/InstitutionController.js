import * as Yup from 'yup';

import User from '../models/User';
import Institution from '../models/Institution';

class InstitutionController {
  async index(req, res) {
    const institution = await Institution.findAll();

    return res.json(institution);
  }

  async show(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      id: Yup.integer().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const institution = await Institution.findByPk(id);

    /**
     * Check if institution already exists
     */
    if (!institution) {
      return res.status(400).json({ error: 'Employee does not exists' });
    }

    return res.json(institution);
  }

  async store(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      name: Yup.string()
        .max(45)
        .required(),
      description: Yup.string()
        .max(200)
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

    const { name, description } = req.body;

    let institution = await Institution.findOne({ where: { name } });

    /**
     * Check if institution already exists
     */
    if (!institution) {
      institution = await Institution.create({ name, description });
    }

    return res.json(institution);
  }

  async update(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      id: Yup.integer().required(),
      name: Yup.string().max(45),
      description: Yup.string().max(200),
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
        .json({ error: 'You can only create one institution as an admin' });
    }

    const { id, name } = req.body;

    const institution = await Institution.findByPk(id);

    /**
     * Check if institution already exists
     */
    if (!institution) {
      return res.status(400).json({ error: 'Employee does not exists' });
    }

    /**
     * Verify new name already exists
     */
    if (name !== institution.name) {
      const institutionExists = await Institution.findOne({ where: { name } });

      if (institutionExists) {
        return res.status(400).json({ error: 'Institution already exists.' });
      }
    }

    const { description } = await institution.update(req.body);

    return res.json({ id, name, description });
  }
}

export default new InstitutionController();
