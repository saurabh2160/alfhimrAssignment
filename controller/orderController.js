const userModel = require('../model/userModel')
const productModel = require('../model/productModel')
const orderModel = require('../model/orderModel')


const createOrder = async (req, res) => {
    try {
        const userId = req.params.userId
        const data = req.body


        const { productId, quantity } = data

        const findUser = await userModel.findOne({ _id: userId })
        if (!findUser) return res.status(404).send({ status: false, message: "User does not exists" })


        let validProduct = await productModel.findOne({ _id: productId })
        if (!validProduct) return res.status(404).send({ status: false, message: `Product not found  or has been deleted` })

        const orderDetails = {}
        orderDetails['userId'] = userId
        orderDetails['items'] = [{ productId: validProduct._id, productPrice: validProduct.price, quantity: quantity }]
        orderDetails['totalPrice'] = validProduct.price * Number(quantity)


        const getOrder = await orderModel.create(orderDetails)
        if (!getOrder) return res.status(400).send({ status: false, message: "Order not Placed" })


        return res.status(201).send({ status: true, message: "Success", data: getOrder })

    } catch (err) {
        return res.status(500).send({ status: false, err: err.message });
    }
}

module.exports = { createOrder }