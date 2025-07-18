import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/clientRoute.js'

const app = express()

app.use(cors())

app.use('/', (req, res) => {
  res.send('Welcome to Backend Server.......')
})

const PORT = 3000

app.listen(PORT, () => {
  console.clear()
  console.log('listening on port 5000')
})
