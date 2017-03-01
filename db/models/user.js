'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const db = require('APP/db')

const User = db.define('users', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
			isEmail: true,
			notEmpty: true,
		}
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  streetAddress: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING,
    validate: {
      len: 2
    }
  },
  zipCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: 5
    }
  },
  creditCard: {
    type: Sequelize.BIGINT,
    validate: {
      len: 16
    }
  },
  cvc: {
    type: Sequelize.INTEGER,
    validate: {
      len: 3
    }

  },

  // We support oauth, so users may or may not have passwords.
  password_digest: Sequelize.STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
	password: Sequelize.VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
	indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  getterMethods: {
	  fullName: function() {
	    return this.firstName + ' ' + this.lastName
	  },
    fullAddressWithName: function() {
	    return this.fullName + '\n' + this.streetAddress + '\n' + this.city + ', ' + this.state + ' ' + this.zipCode
    }
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate (plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      )
    }
  }
})

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
	  bcrypt.hash(user.get('password'), 10, (err, hash) => {
		  if (err) reject(err)
		  user.set('password_digest', hash)
      resolve(user)
	  })
  )
}

module.exports = User
