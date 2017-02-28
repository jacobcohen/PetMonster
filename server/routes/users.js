'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('../auth.filters')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/', (req, res, next) => //add back forbidden('only admins can list users'),
  {
    console.log(User.findAll)
     User.findAll()
      .then(users => {
        console.log(users)
        res.json(users)
        console.log('hello')
      })
      .catch(next)
  })
  .post('/', (req, res, next) =>
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id', (req, res, next) => //must put back in mustBeLoggedIn
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .put('/:id', (req, res, next) =>  //maybe add mustBeAdmin?
    User.update(req.body, {where: {id:req.params.id}})
      .then(user => res.json(user))
      .catch(next))
  .delete('/:id', (req, res, next) => //must put back in mustBeLoggedIn
    User.destroy({where: {id: req.params.id}})
      .then(user => res.json(user))
      .catch(next))
