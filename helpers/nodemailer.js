const nodemailer = require('nodemailer');

module.exports.sendMail = async (emailClient, username, name) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'vippro01648356832@gmail.com',
                pass: 'Hanhphucao1'
            }
        });
        let mainOptions = {
            from: 'Laundry',
            to: emailClient,
            subject: 'Đăng ký tài khoản',
            text: 'Bạn nhận được tin nhắn từ laundry',
            html: `<b>Bạn đăng ký tài khoản thành công với Username:${username} và Tên là:${name}</b>`
        }
        await transporter.sendMail(mainOptions);
        console.log("Send mail success");
    } catch (error) {
        console.log(error);
    }
}

module.exports.sendMailForgotPassword = async (emailClient, password) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'vippro01648356832@gmail.com',
                pass: 'Hanhphucao1'
            }
        });
        let mainOptions = {
            from: 'Laundry',
            to: emailClient,
            subject: 'Quên mật khẩu',
            text: 'Bạn nhận được tin nhắn từ laundry',
            html: `<p>Mật khẩu mới của bạn là:<b>${password}</b></p>`
        }
        await transporter.sendMail(mainOptions);
        console.log("Send mail success");
    } catch (error) {
        console.log(error);
    }
}