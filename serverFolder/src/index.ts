import express from 'express';
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/samurai', (req, res) => {
  res.send('Hello Samurais!!!!!!!!!!')
})
app.post('/samurai', (req, res) => {
  res.send('We create samurai!!!!')
})
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})