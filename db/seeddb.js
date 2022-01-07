const { db, User, Order } = require('./index');
async function userCollection() {
  try {
    db.dropCollection('users');
    await User.insertMany([
      {
        firstName: 'Nam',
        lastName: 'Nguyen',
        username: 'namnguyen@gmail.com',
        birthdate: new Date(1983, 10, 30),
        role: 'user',
      },
      {
        firstName: 'Mai',
        lastName: 'Nguyen',
        username: 'mainguyen@gmail.com',
        birthdate: new Date(1983, 11, 4),
        role: 'seller',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}
// userCollection()
// .then((data) => console.log(data))
// .catch((err) => console.log(err));
async function orderCollection() {
  try {
    // db.dropCollection('orders');
    await Order.insertMany([
      {
        customer: '61d58fd8aae4c393ab178015',
        seller: '61d58fd8aae4c393ab178016',
        createdAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}
orderCollection().catch((err) => console.log(err));
