const express = require('express');
const router = express.Router();

const ordersControllers = require('../controllers/order');
const checkAuth = require('../middleware/check-auth');



router.get('/', checkAuth, ordersControllers.ordersGetAll);

router.post('/', checkAuth, ordersControllers.orderCreate);


router.get('/:orderId', checkAuth, ordersControllers.orderGetOne);


router.delete('/:orderId', checkAuth, ordersControllers.orderDelete);


module.exports = router;