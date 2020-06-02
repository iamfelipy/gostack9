
import * as Yup from 'yup';

import User from '../models/User';

class UserController {

  async index(req, res) {

    const user = await User.findAll();

    return res.json(user);
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    return res.json(user);
  }

  async store(req, res) {

    //montando schema esboço das entradas
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const { id, name, provider } = await User.create(req.body);

    return res.status(201).json({ id, name, email, provider });

  }

  async update(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>  oldPassword ? field.required() : field )
    });

    const { id } = req.params;
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ message: 'Password does not match.' });
    }

    const { name, provider } = await user.update(req.body);

    return res.json({ id, name, email: user.email, provider });
  }

  async delete(req, res) {

  }
}

export default new UserController;