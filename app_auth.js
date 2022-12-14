const express = require('express')
const app = express()
const { sequelize, Users } = require('./models')
const path = require('path')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const joi_validation = require('./joi_validation/joi_validation.js')
require('dotenv').config()

app.use(express.json())

let corsOptions = {
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.post('/register', (req, res) => {

    const validation = joi_validation.userRegistrationValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Users.create({
        role: req.body.role,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        phone_number: req.body.phone_number,
        email: req.body.email
    })
        .then(row => {
            const userDto = { id: row.id, role: row.role, address: row.address, first_name: row.first_name, last_name: row.last_name, username: row.username, email: row.email }
            res.json({user: userDto})
        })
        .catch(err => res.status(500).json(err))
})

app.post('/login', (req, res) => {
    const validation = joi_validation.userLoginValidation(req.body)

    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Users.findOne({ where: { email: req.body.email } })
        .then(row => {
            if (bcrypt.compareSync(req.body.password, row.password)) {
                const userDto = { id: row.id, role: row.role, address: row.address, first_name: row.first_name, last_name: row.last_name, username: row.username, email: row.email }
                const token = jwt.sign(userDto, process.env.JWT_KEY)
                res.json({ token: token })
            } else
                res.status(400).json({ message: "Invalid credentials" })
        })
        .catch(err => res.status(500).json({error: err}))
})

app.listen({ port: 8082 }, async () => {
    await sequelize.authenticate();
    console.log('Auth server started!')
})