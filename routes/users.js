const { default: axios } = require('axios');
var express = require('express');
const { Order, User } = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.render('user', { users });
  } catch (error) {
    res.status(404).send('has an error');
  }
});
router.post('/', async (req, res) => {
  const { lastName, firstName, birthdate, username, password } = req.body;
  if (lastName && firstName && birthdate && username && password) {
    try {
      const response = await axios.post('http://localhost:3000/api/users', {
        user: { lastName, firstName, birthdate, username },
        password,
      });
      console.log(response.data);
      return res.send(response.data);
    } catch (error) {
      return res.send(error);
    }
  }
  return res.json({ error: 'input cannot empty' });
});
router.get('/register', async (req, res) => {
  res.render('createuser.pug');
});
router.get('/:id', async function (req, res, next) {
  const { id } = req.params;
  try {
    const data = await Order.find({ customer: id })
      .populate('customer')
      .populate('seller');
    console.log(data);
    return res.render('userdetail', { data: data ?? null });
  } catch (error) {
    return res.status(500).send('has an error');
  }
});

module.exports = router;
