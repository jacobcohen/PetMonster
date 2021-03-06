'use strict'; // eslint-disable-line semi

const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const mustBeAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).send('You must be an admin')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const selfOrAdmin = action => (req, res, next) => {
  if (req.params.id !== req.user.id || !req.user.isAdmin) {
    return res.status(403).send(`You can only ${action} yourself or as admin.`)
  }
}

const forbidden = message => (req, res, next) => {
  res.status(403).send(message)
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)

module.exports = {mustBeLoggedIn, mustBeAdmin, selfOnly, forbidden, selfOrAdmin}
