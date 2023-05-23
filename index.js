require('dotenv').config();

const app = require('./app');
const passport = require('passport');
const compression = require('compression');

const {
    passportAdmin,
    passportEditor,
    passportUser,
} = require('./middleware/passport');
const setupDB = require('./db');
const usersRoutes = require('./components/user/routeUsers');
const wordsRoutes = require('./components/words/routeWords');

const PORT = process.env.PORT || 4000;

setupDB();

passportAdmin(passport);
passportEditor(passport);
passportUser(passport);

app.use('/user', usersRoutes);
app.use('/words', wordsRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
