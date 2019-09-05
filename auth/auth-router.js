const router = require('express').Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model.js')
const secrets = require('../config/secrets.js')


// REGISTER
// for endpoint beginning with /api/auth
router.post('/register', (req, res) => {
  const user  = req.body
  const hash = bcrypt.hashSync(user.password, 10) // 2 ^ n
  user.password = hash

  Users.add(user)
  .then(saved => {
    res.status(201).json(saved)
  })
  .catch(error => {
    res.status(500)/json(error)
  })
})


// LOGIN
