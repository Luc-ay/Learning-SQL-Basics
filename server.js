import express from 'express'
import categoryRouter from './routes/categoryRoute.js'

const app = express()
app.use(express.json())

// app.use('/', (req, res) => {
//   return res.json('Welcome to Backend Server.......')
// })

app.use('/categories', categoryRouter)

const PORT = 3000

app.listen(PORT, () => {
  console.clear()
  console.log('listening on port 5000')
})
