const express = require('express')
const conectarDB = require('./config/db')
const cors = require("cors")

// CREAR SERVIDOR
const app = express()

// Conectar a base de datos
conectarDB()

// Habilitar CORS
app.use(cors())

// Habilitar express.json. Permitir datos que el usuario envíe.
app.use(express.json({extended:true}))

// PUERTO DE LA APP
const PORT = process.env.PORT || 3001

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))

// DEFINIR LA PÁGINA PRINCIPAL
app.get('/', (req,res) => {
    res.send("Hola mundo")
})


// ARRANCAR LA APP
app.listen(PORT, () => {
    console.log("El servidor está funcionando")
})

// const mongoose = require('mongoose');
// const app = require('./app');
// const port = process.env.PORT || 3001;
// const { API_VERSION, IP_SERVER, PORT_DB} = require('./config')


// mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/webpersonal`,
// { useNewUrlParser:true, useUnifiedTopology: true }, (err, res) => {
//   if(err) {
//     throw err;
//   } else {
//     console.log('La conexion a la base de datos ha sido exitosa')
//     app.listen(port, () => {
//       console.log('####################')
//       console.log('##### API REST #####')
//       console.log('####################')
//       console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`)
//     })
//   }
// })

// mongoose.connect(`mongodb+srv://diegobarrera:Holamundo2021@cluster0.ubmvm.mongodb.net/webpersonal`, { useNewUrlParser:true, useUnifiedTopology: true }, (err, res) => {
//   if(err) {
//     throw err
//   } else {
//     console.log('La conexion a la base de datos ha sido exitosa')
//     app.listen(port, () => {
//       console.log('####################')
//       console.log('##### API REST #####')
//       console.log('####################')
//       console.log(`http://${IP_SERVER}:${PORT_DB}`)
//     })
//   }
// })