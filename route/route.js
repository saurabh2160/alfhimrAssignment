const express = require('express');
const { createProduct, getProduct } = require('../controller/productController')
const { createUser } = require('../controller/userController')
const { createOrder } = require('../controller/orderController')
const router = express.Router();


//create user
router.post('/createuser', createUser)

//product api
router.post('/createProduct', createProduct)
router.get('/findProduct', getProduct)

//order api
router.post('/placeOrder/:userId', createOrder)


module.exports = router