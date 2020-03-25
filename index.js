const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')

const cors = require('cors')

require('dotenv/config');

const app = express()

// controller
verifyToken = require('./controllers/verifyToken')

// routes
login = require('./routes/login');
user = require('./routes/user');
category = require('./routes/category');
memo = require('./routes/memo');

app.use(cors())

// view engine setup
app.set('view', path.join(__dirname, 'view'));
app.set('view engine', 'html')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// connect mongodb
var mongoDB = process.env.MONGODB_URL
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  mongoDB,
  () => {
      console.log("connect mongodb is a magic!");
  }
);

app.use('/login', login);
app.use('/user', user);
app.use('/category', category);
app.use('/memo', memo);

app.get('/a', (req, res) => {
  res.json({sayHi: 'hello from server, nice to meet you!'})
})

app.post('/checkToken', verifyToken.checkToken)

const port = process.env.PORT || 5000

app.listen(port, () => {
   console.log('App listening on port 5000')
})