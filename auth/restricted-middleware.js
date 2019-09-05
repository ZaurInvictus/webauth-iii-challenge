const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  // CHECK THAT THE TOKEN IS VALID
  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err) {
        // token is invalid
        res.status(401).json({ you: 'shall not pass'})
      } else {
         // token is good
         req.user = { username: decodedToken.username}
         next()
      }
    })
  } else {
    res.status(400).json({ message: 'give me token' })
  }
}