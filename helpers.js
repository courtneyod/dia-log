const JWT = require("jsonwebtoken");
const knex = require("./knex");
const bcrypt = require("bcrypt-as-promised");
const APP_SECRET = "SUPERSECRETAPPSECRET";

function generateToken(user, secret) {
    var u = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
    };

    return token = JWT.sign(u, secret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

function authenticateAndJWT(user) {
    if (user !== undefined) {
        var token = generateToken({
            id: user.id,
            username: user.first_name,
            email: user.email
        }, APP_SECRET);

        return {jwt: token, authenticated: true};
    } else {
        return {authenticated: false};
    }
}



module.exports = {
    generateToken,
    authenticateAndJWT,
};
