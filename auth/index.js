const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret

function sign(data) {
    try {
        return jwt.sign(data, secret)
    } catch (err) {
        throw error(err)
      }
}

function verify(token){
    try {
        return jwt.verify(token, secret)
      } catch (error) {
        throw error(error.message)
      }
}

const check = {
    own: function(req, owner){
        const decoded = decodeHeader(req)

        if(decoded.id !== owner){
            throw error('Deficient permissions',401)
        }

    },
    logged: function(req, owner){
        const decoded = decodeHeader(req)
    }
}

function getToken(auth){
    if(!auth) {
        throw error('Without token')
    }

    if (auth.indexOf('Bearer ') === -1){
        throw error('Invalid format',401)
    }

    let token = auth.replace("Bearer ", "")
    return token
}

function decodeHeader(req){
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = verify(token)

    req.user = decoded

    return decoded
}

module.exports = {
    sign,
    check,
}