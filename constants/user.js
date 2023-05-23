const CONFIRM_EMAIL = {
    title: 'Подтвердите email',
    message:
        'На почту было отправленно письмо с инструкцией для подтвержения email.',
};
const CONFIRM_EMAIL_USER_DOES_NOT_EXIST = {
    title: 'Пользователя не существует',
    message:
        'Пользователя с таким email или login не существует. Пройдите регистрацию!',
};
const CONFIRM_EMAIL_EMAIL_WAS_CONFIRMED = {
    title: 'Email подтвержден',
    message:
        'Email был успешно подтвержден. Теперь можете войти в личный кабинет',
};
const CONFIRM_EMAIL_EMAIL_ALREADY_WAS_CONFIRMED = {
    title: 'Email подтвержден',
    message:
        'Email был успешно подтвержден. Теперь можете войти в личный кабинет',
};
const CONFIRM_EMAIL_INCORRECT_TOKEN = {
    title: 'Не верный токен',
    message:
        'Неверный токен. Пройдите регистрацию, если ещё не сделали это, иначе восстановите пароль или обратитесь к администратору',
};

const SIGNUP_USERNAME_EXISTS = {
    title: 'Выберите другое имя',
    message:
        'Пользователь с таким никнеймом уже существует. Выберите другое имя пользователя',
};
const SIGNUP_USER_WITH_EMAIL_EXISTS = {
    title: 'Email уже занят',
    message:
        'Пользователь с этим email уже существует. Попробуйте войти в личный профиль или восстановить пароль',
};
const SIGNUP_CREATE_USER = {
    title: 'Пользователь успешно создан',
    message:
        'На указанную почту было отправлено письмо для завершения регистрации',
};

module.exports = {
    CONFIRM_EMAIL,
    CONFIRM_EMAIL_EMAIL_WAS_CONFIRMED,
    CONFIRM_EMAIL_INCORRECT_TOKEN,
    CONFIRM_EMAIL_USER_DOES_NOT_EXIST,
    SIGNUP_USERNAME_EXISTS,
    SIGNUP_USER_WITH_EMAIL_EXISTS,
    SIGNUP_CREATE_USER,
    CONFIRM_EMAIL_EMAIL_ALREADY_WAS_CONFIRMED,
};
