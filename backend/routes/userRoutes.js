const express = require('express')

const userRoute = express.Router()

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController')

userRoute.get('/getalluser', getUsers)
userRoute.get('/getalluser/:id', getUserById)
userRoute.post('/getalluser', createUser)
userRoute.put('/getalluser/:id', updateUser)
userRoute.delete('/getalluser/:id', deleteUser)

module.exports = { userRoute }