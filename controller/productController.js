const { client } = require('../config/redis.config')
const productModel = require('../model/productModel')



const createProduct = async (req, res) => {
    try {
        let data = req.body
        let { name, specifications, price, category } = data

        if (!name)
            return res.status(400).send({ status: false, message: "name is required" })
        if (!specifications)
            return res.status(400).send({ status: false, message: "specifications is required" })
        if (!price)
            return res.status(400).send({ status: false, message: "price is required" })
        if (!category)
            return res.status(400).send({ status: false, message: "category is required" })

        //db call for name
        let uniqueName = await productModel.findOne({ name: { $regex: name, $options: "i" } })
        if (uniqueName) {
            if (uniqueName.name.toUpperCase() == name.toUpperCase()) {
                return res.status(400).send({ status: false, message: "name already exsits" })
            }
        }

        let result = await productModel.create(data)
        await client.del(category)
        return res.status(201).send({ status: true, message: 'Success', data: result })
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
}


const getProduct = async (req, res) => {
    try {
        const data = req.query
        let { category } = data


        let response = await client.get(category)
        if (response) {
            console.log('res from resdis')
            response = JSON.parse(response)
            return res.status(200).send({ status: true, message: 'Success', data: response })
        }
        //navie approach
        //products above 1000
        // const filter_1 = {}
        // //products below 1000
        // const filter_2 = {}
        // if (name) {
        //     filter_1['name'] = { $regex: name, $options: 'i' }
        //     filter_2['name'] = { $regex: name, $options: 'i' }
        // }
        // if (category) {
        //     filter_1['category'] = { $regex: category, $options: 'i' }
        //     filter_1['price'] = { $gte: 1000 }

        //     filter_2['category'] = { $regex: category, $options: 'i' }
        //     filter_2['price'] = { $lt: 1000 }

        // }

        // const product_gte = await productModel.find(filter_1)
        // const product_lt = await productModel.find(filter_2)

        // const result = {
        //     group_1: { msg: "products prize above 1000", data: product_gte },
        //     gropu_2: { msg: "products prize under 1000", data: product_lt }
        // }

        //agregation aproach
        const result = await productModel.aggregate([{
            "$project": {
                "name": 1,
                "price": 1,
                "category": 1,
                "specifications": 1,
                "range": {
                    "$cond": [
                        { "$gte": ["$price", 1000] },
                        "price above 1000",
                        "price below 1000"
                    ]
                }
            }
        },
        {
            $match: {
                category: category
            }
        },
        {
            $group: {
                "_id": "$range",
                "data": {
                    "$push": {
                        "_id": "$_id",
                        "name": "$name",
                        "price": "$price",
                        "category": "$category",
                        "specifications": "$specifications",
                    }
                }
            }
        }])
        await client.set(category, JSON.stringify(result))
        //succesful response if not found data in redis
        return res.status(200).send({ status: true, message: 'Success', data: result })

    }
    catch (e) {
        console.log(e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
}
module.exports = { createProduct, getProduct }