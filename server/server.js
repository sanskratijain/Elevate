// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const expressJwt = require('express-jwt');


const app = express();

app.use(bodyParser.json());

// app.use(expressJwt({ secret: 'my secret' }).unless({ path: ['/login'] }));

// app.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).send('Invalid token...');
//     }
// });
// server.js
// app.get('/protected', expressJwt({ secret: 'my secret' }), (req, res) => {
//     res.send('Access granted to protected resources...');
// });

mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).send('Username not found...');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ _id: user._id }, 'my secret');
    res.send({ auth: true, token });
});

const port = process.env.PORT || 5501;
app.listen(port, () => console.log(`Server running on port ${port}`));