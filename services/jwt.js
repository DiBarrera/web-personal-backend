const jwt = require("jsonwebtoken");
const moment = require('moment');
const User = require("../models/User");

// const SECRETA = 'palabraultrasecreta'

exports.createAccessToken = function(user) {
  const payload = {
    id: user._id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment()
      .add(3, 'hours')
      .unix()
  }

  // return jwt.encode(payload, process.env.SECRETA)
  return jwt.decode(payload, process.env.SECRETA)
  // return jwt.verify(payload, SECRETA)
}

exports.createRefreshToken = function(user) {
  const payload  = {
    id: user._id,
    exp: moment()
      .add(30, 'days')
      .unix()
  }

  // return jwt.encode(payload, process.env.SECRETA)
  return jwt.decode(payload, process.env.SECRETA)
    // return jwt.verify(payload, SECRETA)
}

exports.decodeToken = function(token) {
  return jwt.decode(token, SECRETA, true)
}

// export function createAccessToken(user) {
// }

// export function createRefreshToken(user) {
// }

// export function decodeToken(token) {
// }

