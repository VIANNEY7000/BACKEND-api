import  dotenv  from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import userRouter from './route/user-route.js'
import producRouter from './route/Product-Route.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


// MONGODB CONNECTION 
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Database is active")
}) .catch (() => {
    console.log("Database is not active")
})


// Route
app.use('/api/users', userRouter),
app.use('/api/products', producRouter)



console.log('my name is vianney')


// RUNING DEV
app.listen(5000, () => {
    console.log(`backend runing in port ${process.env.PORT}`)
}) 

app.get('/', (
    req, res) => {
    res.send('hello alex')
})
