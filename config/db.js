const mongoose = require('mongoose')
require('dotenv').config({path: '.env'})

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("DB Conectada")
    } catch(error){
        console.log(error)
        process.exit(1) // Detener la app
    }


}

module.exports = conectarDB

// const mongoose = require('mongoose');

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://diegobarrera:Holamundo2021@cluster0.ubmvm.mongodb.net/webpersonal';

// mongoose
//   .connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   })
//   .then(() => console.log(`Successfully connected to the database ${MONGODB_URI}`))
//   .catch(error => {
//     console.error(`An error ocurred trying to connect to the database ${MONGODB_URI}: `, error);
//     process.exit(1);
//   })

  // mongoose
  //   .connect('mongodb://localhost/webpersonal', {useNewUrlParser: true})
  //   .then(x => {
  //     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  //   })
  //   .catch(err => {
  //     console.error('Error connecting to mongo', err)
  //   });