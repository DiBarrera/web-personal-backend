const User = require('../models/User');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
// const jwt = require("jsonwebtoken");
const jwt = require('../services/jwt');

exports.signup = async (req, res, next) => {
// async function signup(req, res, next) {

  const user = new User()
  
  console.log('Endpoint de signup ejecutado')
  console.log(req.body)

  // res.json({mensaje: 'soy el signup'})

  const { nombre, apellido, email, password, repeatPassword } = req.body
  user.nombre = nombre;
  user.apellido = apellido;
  user.email = email.toLowerCase();
  user.role = 'admin';
  user.active = false;

  if(!password || !repeatPassword) {
    res.status(404).send({message: 'Las contaseñas son obligatorias'})
  } else {
    if(password !== repeatPassword) {
      res.status(404).send({message: 'Las contraseñas tienen que ser iguales.'})
    } else {
      const salt = await bcrypt.genSalt(10)
      bcrypt.hash(password, salt, (error, hash) => {
        if(error) {
          res
          .status(500)
          .send({message: 'Error al encriptar la contraseña'})
        } else {
          res.status(200).send({message: hash})
          console.log(hash)
          user.password = hash
          user.save((error, userStored) => {
            if(error) {
              next => res.status(500).send({message: 'El usuario ya existe.'})
            } else {
              if(!userStored) {
                res.status(404).send({message: 'Error al crear el usuario.'})
              } else {
                // res.status(200).send({user: userStored})
              }
            }
          })
        }
      })
      // res.status(200).send({message: 'Usuario creado.'})
    }
  }
}

exports.signin = async (req, res, next) => {

  console.log('Login correcto.........')
  
  const params = req.body
  console.log(params)

  // const nombre = params.nombre
  const email = params.email.toLowerCase()
  const password = params.password

  User.findOne({ email }, (error, userStored) => {
    if(error) {
      res.status(500).send({ message: 'Error del servidor' })
    } else {
      if(!userStored) {
        res.status(404).send({ message: 'Usuario no encontrado' })
      } else {
        console.log(`---${userStored}`)
        bcrypt.compare(password, userStored.password, (error, check) => {
          if(error) {
            res.status(500).send({ message: 'Error del servidor' })
          } else if(!check) {
            res.status(404).send({ message: 'La contraseña es incorrecta' })
          } else {
            if(!userStored.active) {
              res.status(200).send({code: 200, message: 'El usuario no se ha activado'})
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored)
              })
            }
          }
        })
      }
    }
  })
}

// function signup (req, res) {
//   const user = new User()
//   const {} = req.body
//   console.log(req.body)
//   res.json({mensaje: 'soy el signup'})
// }

// module.exports = {
//   signup,
//   signin
// }