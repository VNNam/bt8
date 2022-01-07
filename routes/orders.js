const router = require('express').Router();
router.get('/', (req, res) => {
  res.render('orders.pug', { products: ['banh', 'trais'] });
});
module.exports = router;
