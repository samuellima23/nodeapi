const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


//iniciando o app
const app = express();
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});


app.use(express.json());
app.use(cors());
//iniciando o db
//mongoose.connect('mongodb://localhost:27017/nodeapi', 
//{useNewUrlParser:true,useUnifiedTopology:true}
//)

require('./src/models/Product');

//rotas
app.use('/api', require('./src/routes'));


app.listen(process.env.PORT || 3000);