const GETTING_RANDOM_WORD = {
    title: 'Ошибка получения случайного слова',
    message:
        'Ошибка на стороне сервера. Не удалось получить случайное слово. Повторите попытку!',
};
const SERVER = {
    title: 'Ошибка сервера',
    message:
        'На сервере произошла неполадка. Повторите попытку позже или свяжитесь с администратором',
};
const RESET_USER_DOES_NOT_EXIST = {
    title: 'Такого пользователя не существует',
    message:
        'Пользователя с указанным email не существует. Пройдите регистрацию.',
};

module.exports = { GETTING_RANDOM_WORD, SERVER, RESET_USER_DOES_NOT_EXIST };
