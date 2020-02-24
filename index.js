const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser'),

// controller
// var verifyToken = require('./controllers/verifyToken')

// routes
login = require('./routes/login');
user = require('./routes/user');
var category = require('./routes/category');

require('dotenv/config');

const app = express()

// tim hieu them!!!
app.use((req, res, next) => { //doesn't send response just adjusts it
  res.header("Access-Control-Allow-Origin", "http://localhost:3000") //* to give access to any origin
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, language" //to give access to all the headers provided
  )
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
  next(); //so that other routes can take over
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
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

app.get('/a', (req, res) => {
  res.json({sayHi: 'hello from server, nice to meet you!'})
})

app.listen(5000, () => {
   console.log('App listening on port 5000')
})