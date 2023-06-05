const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())


const { userRoute } = require('./routes/userRoutes')
app.use('/api', userRoute)


app.listen(process.env.PORT, (err) => {
    console.log(`server is started on port http://localhost:${process.env.PORT}`)
})