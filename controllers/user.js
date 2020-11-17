const UserModel = require('../models/users');
const bcryptHelp = require('../helpers/brcypt-js');
const mailerHelp = require('../helpers/nodemailer');

module.exports.postUser = async (req, res) => {
    try {
        let { username, password, name, email } = req.body;
        let passwordHash = bcryptHelp.hashPassword(password.toString());
        let user = new UserModel({
            username: username,
            password: passwordHash,
            name: name,
            email: email,
            phone: req.body.phone ? req.body.phone : '',
            address: req.body.address ? req.body.address : ''
        })
        await user.save();
        mailerHelp.sendMail(email, username, name);
        res.status(200).json({
            success: true,
            results: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}