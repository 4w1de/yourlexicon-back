const { CONFIRM_EMAIL } = require('../../constants/urls');

const generateMail = require('./generateMail');

const signupEmail = (email, token) => {
    const subject = 'Подтвердите свой электронный адрес';
    const html = `
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        </head>
        <body>
            <h1>Здравствуйте</h1>
            <p>Для завершения регистрации необходимо перейти по ссылке: <a href="${CONFIRM_EMAIL}${token}" target="_blank">${CONFIRM_EMAIL}${token}</a></p>
        </body>
    </html>`;
    generateMail(email, subject, html);
};

module.exports = signupEmail;
