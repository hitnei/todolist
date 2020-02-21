const express = require('express')
const mongoose = require('mongoose');
const path = require('path');

// controller
// var verifyToken = require('./controllers/verifyToken')

// routes
// var category = require('./routes/category');

require('dotenv/config');

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html')
// app.set('views', './view/public')

// connect mongodb
var mongoDB = process.env.MONGODB_URL
mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
      console.log("connect mongodb is a magic!");
  }
);

// tim hieu them!!!
// app.use((req, res, next) => { //doesn't send response just adjusts it
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000") //* to give access to any origin
//   res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization, language" //to give access to all the headers provided
//   );
//   if(req.method === 'OPTIONS'){
//       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
//       return res.status(200).json({});
//   }
//   next(); //so that other routes can take over
// })

// app.use('/category', verifyToken.verifyToken, category);

app.get('/a', (req, res) => {
  res.json({sayHi: 'hello from server, nice to meet you!'})
})

app.listen(5000, () => {
   console.log('App listening on port 5000')
})