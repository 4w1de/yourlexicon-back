require('dotenv').config();

const app = require('./app');
const passport = require('passport');

const {
    passportAdmin,
    passportEditor,
    passportUser,
} = require('./middleware/passport');
const setupDB = require('./db');
const authRoutes = require('./routes/auth');
const wordsRoutes = require('./routes/words');
const usersRoutes = require('./routes/users');
const feedbackRoutes = require('./routes/feedback');

const PORT = process.env.PORT || 4000;

setupDB();

passportAdmin(passport);
passportEditor(passport);
passportUser(passport);

app.use('/api/auth', authRoutes);
app.use('/api/words', wordsRoutes);
//app.use('/api/users', usersRoutes);
//app.use('/api/feedback', feedbackRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
