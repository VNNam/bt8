const VALID_EMAIL_REGEX = new RegExp(
  // ref: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@" +
    '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
    '(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$'
);

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {
    type: String,
    required: true,
    validate: {
      validator: (email) => VALID_EMAIL_REGEX.test(email),
      message: (props) => `${props.value} is not email`,
    },
  },
  hashedPwd: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: (date) => new Date().getFullYear() - date.getFullYear() > 18,
      message: 'You must greater than 18 years old',
    },
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['user', 'seller', 'admin'],
      message: '{VALUE} is not supported',
    },
    default: 'user',
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model('User', userSchema);

const orderSchema = new Schema({
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User,
    validate: {
      validator: async (id) => await User.findById(id).where({ role: 'user' }),
    },
  },
  seller: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User,
    validate: {
      validator: async (id) =>
        await User.findById(id).where({ role: 'seller' }),
    },
  },
});
const Order = mongoose.model('Order', orderSchema);
module.exports = { mongoose, User, Order };
