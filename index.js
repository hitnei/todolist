const express = require('express')
 
const app = express()

app.set('view engine', 'html')
app.set('views', './view/public')

app.get('/a', (req, res) => {
  res.json({sayHi: 'hello from server, nice to meet you!'})
})

app.listen(5000, () => {
   console.log('App listening on port 5000')
})