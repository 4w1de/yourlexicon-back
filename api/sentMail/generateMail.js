require('dotenv').config();

const nodemailer = require('nodemailer');

const generateMail = (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_LOGIN,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOption = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject,
        html,
    };

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = generateMail;
