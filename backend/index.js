const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const allRoutes = require('./routes/index')



const PORT = process.env.PORT || 3300;
const app = express()

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

// Middlewares

app.use(cors(corsOptions))
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

// Rutas

app.use('/api', allRoutes)


// Conexion a la DB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Conected DB")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// Levantado el servidor

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
  connectDB()
})