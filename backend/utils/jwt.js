const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.generateToken = (user) => {
    return jwt.sign(
        {id: user.id, username: user.username, userType: user.userType},
        JWT_SECRET,
        {expiresIn: '6h'}
    );
};