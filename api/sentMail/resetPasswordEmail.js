require('dotenv').config();

const nodemailer = require('nodemailer');

const generateMail = require('./generateMail');

const sendMail = (email, token) => {
    const subject = 'Сброс пароля';
    const html = `<!DOCTYPE HTML PUBLIC «-//W3C//DTD HTML 4.0 Transitional//EN»>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        </head>
        <body>
            <h1>Здравствуйте</h1>
            <p>Чтобы завершить регистрацию, необходимо подтвердить email, перейдя по этой ссылке: <a href="https://localhost:3000/confirm-email/${token}" target="_blank">Подтверждение email</a></p>
        </body>
    </html>`;
    const { transporter, mailOption } = generateMail(email, subject, html);

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendMail;
