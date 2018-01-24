const jwt = require('jsonwebtoken')
const db = require('./db.json')

function auth(req, res, next) {
  const authHeader = req.header('Authorization')

  if(!authHeader) return next()

  const accessToken = authHeader.match(/Bearer (.*)/)[1]

  jwt.verify(accessToken, 'SECRET KEY', (err, decoded) => {
    if(err) return next()

    req.user = db.users.find(user => user.id === decoded.sub)

    next()
  })
}

module.exports = auth
