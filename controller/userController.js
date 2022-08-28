const userModel = require('../model/userModel')

const createUser = async (req, res) => {
    try {
        let data = req.body
        let { name, email, password, address } = data;


        if (!name)
            return res.status(400).send({ status: false, message: "name required" });
        if (!email)
            return res.status(400).send({ status: false, message: "email required" });
        if (!password)
            return res.status(400).send({ status: false, message: "password required" });
        if (!address)
            return res.status(400).send({ status: false, message: "address required" });


        //DB calls for phone and email
        let emailCheck = await userModel.findOne({ email: email });
        if (emailCheck) return res.status(400).send({ status: false, message: "email already exist" });


        let result = await userModel.create(data);
        return res.status(201).send({ status: true, message: 'Success', data: result });
    } catch (e) {
        console.log(e.message);
        return res.status(500).send({ status: false, message: e.message });
    }
};

module.exports = { createUser }