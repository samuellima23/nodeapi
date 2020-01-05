const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');


//iniciando o app
const app = express();
app.use(express.json());
app.use(cors());
//iniciando o db
mongoose.connect('mongodb://localhost:27017/nodeapi', 
{useNewUrlParser:true,useUnifiedTopology:true}
)

require('./src/models/Product');

//rotas
app.use('/api', require('./src/routes'));

app.listen(process.env.PORT || 3000);