import User from '../models/User';

class UserController {
  async store(req, res) {
    let user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      user = await User.create(req.body);
    }

    const { id, name, phone, email, password_hash } = user;

    return res.json({
      id,
      name,
      phone,
      email,
      password_hash,
    });
  }
}

export default new UserController();
