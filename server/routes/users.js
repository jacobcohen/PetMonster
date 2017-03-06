'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, mustBeAdmin, selfOnly, selfOrAdmin} = require('../auth.filters')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/', (req, res, next) => //get all users.
  {
     User.findAll()
      .then(users => {
        res.json(users)
      })
      .catch(next)
  })
  .post('/', (req, res, next) => //make a new user
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id', (req, res, next) => //getting user by ID
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .put('/:id', selfOrAdmin, (req, res, next) =>  //modifying user. Must be that user or admin
    User.update(req.body, {where: {id:req.params.id}, returning: true})
      .then(users => res.json(users))
      .catch(next))
  .delete('/:id', selfOrAdmin, (req, res, next) => //deleting a user. Must be that user or admin
    User.destroy({where: {id: req.params.id}})
      .then(user => res.json(user))
      .catch(next))
