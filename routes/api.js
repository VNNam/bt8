const api = require('express').Router();
const { User, Order } = require('../db');
const { createHash } = require('crypto');

api.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    const data = user
      ? {
          fullname: `${user.firstName} ${user.lastName ?? null}`,
          email: user.username,
          birthdate: user.birthdate,
          role: user.role,
        }
      : { error: 'user does not exist!' };

    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

api.post('/users', async (req, res) => {
  const { user, password } = req.body;
  if (!(user && password)) return res.json({ error: 'input cannot empty' });
  try {
    const userHasOnDB = await User.findOne({ username: user.username });
    if (userHasOnDB) return res.json({ error: 'username has existed' });
    const response = await User.create({
      ...user,
      hashedPwd: createHash('sha256', 'pwd').update(password).digest('hex'),
    });
    return res.json(response ?? { error: 'error on create user' });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

api.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, birthdate } = req.body;
  if (firstName && lastName && birthdate) {
    try {
      const user = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        birthdate,
      });
      return res.json(user ?? { error: 'Cannot update user!' });
    } catch (error) {
      return res.json({ error: error.message });
    }
  } else {
    return res.json({ error: 'Input cannot empty!' });
  }
});

api.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(id, { isLocked: true }, (error, doc, res) => {
      return res.json({ error: error?.message, doc });
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

module.exports = api;
