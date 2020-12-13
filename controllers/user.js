const generatorPassword = require('generate-password');
const UserModel = require('../models/users');
const bcryptHelp = require('../helpers/brcypt-js');
const mailerHelp = require('../helpers/nodemailer');
const jwtHelp = require('../helpers/jwt');

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

//auth
module.exports.postAuth = async (req,res)=>{
    try {
        let {username,password} = req.body;
        if(username && password){
            let user = await UserModel.findOne({username:username});
            if(user && bcryptHelp.checkPassword(password,user.password)){
                let dataUser = {
                    idUser:user._id,
                    username:user.username,
                    name:user.name,
                    email:user.email,
                    phone:user.phone?user.phone:'',
                    address:user.address?user.address:''
                }
                let jwt = jwtHelp.signToken(dataUser);
                res.status(200).json({
                    success:true,
                    jwt:jwt,
                    user:dataUser
                })
            }else{
                res.status(401).json({
                    success: false,
                    message:"Password or username not correct"
                })
            }
        }else{
            res.status(401).json({
                success: false,
                message:"Please input username and password"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

//change password
module.exports.patchChangePassword = async (req,res)=>{
    try {
        let username = req.params.username;
        let {oldPass,newPass} = req.body;
        let user = await UserModel.findOne({username:username});
        if(bcryptHelp.checkPassword(oldPass,user.password)){
            let newPassHash = bcryptHelp.hashPassword(newPass);
            await UserModel.findOneAndUpdate(
                {username:username},
                {$set:{password:newPassHash}},
                {new:true}
            )
            res.status(200).json({
                success: true,
                message: "Change Password Success"
            })
        }else{
            res.status(401).json({
                success: false,
                message: "Password not correct"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

//forgot password
module.exports.forgotPassword = async(req,res)=>{
    try {
        let email = req.params.email;
        let newPassword = generatorPassword.generate({
            length:10,
            numbers:true,
        });
        let newPasswordHash = bcryptHelp.hashPassword(newPassword);

        await UserModel.findOneAndUpdate(
            {email:email},
            {$set:{password:newPasswordHash}},
            {new:true}
        )

        mailerHelp.sendMailForgotPassword(email, newPassword);
        
        res.status(200).json({
            success:true,
            message:"New password was send through email, please check email (if email exsit)"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}