import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.string()
        .min(10)
        .max(11)
        .required(),
      email: Yup.string()
        .email()
        .required(),
      provider: Yup.boolean(),
      password: Yup.string()
        .min(6)
        .max(12)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      user = await User.create(req.body);
    }

    const { id, name, phone, email } = user;

    return res.json({
      id,
      name,
      phone,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      phone: Yup.string()
        .min(10)
        .max(11),
      email: Yup.string().email(),
      oldPassword: Yup.string().max(12),
      password: Yup.string()
        .min(6)
        .max(12)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, phone } = await user.update(req.body);

    return res.json({
      id,
      name,
      phone,
      email,
    });
  }

  async index(req, res) {
    const users = await User.findAll({
      where: {
        provider: false,
      },
    });

    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;

    const users = await User.findByPk(id);

    return res.json(users);
  }
}

export default new UserController();
