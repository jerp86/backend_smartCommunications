import User from '../models/User';

class UserController {
  async store(req, res) {
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
}

export default new UserController();
