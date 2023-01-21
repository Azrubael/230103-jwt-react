require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')



const PORT = process.env.PORT || 9009
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(  {            // отвечает за взаимодействие сервера с браузером
   credentials: true,
   origin: process.env.CLIENT_URL
}))            
app.use('/api', router)
app.use(errorMiddleware)   // Middleware обработки ошибок д/быть последним!!!

const start = async () => {
   try {
      mongoose.set('strictQuery', true)
      await mongoose.connect(process.env.DB_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      app.listen(PORT, () => console.log(`The server started on PORT = ${PORT}`))
   } catch(e) {
      console.warn(e)
   }
}

start()
