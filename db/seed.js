'use strict'; // eslint-disable-line semi

const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {firstName: 'Gabe', lastName: 'Lebec', email: 'ILikeSwords@aol.com', isAdmin: false, streetAddress: '3 Javascript Lane', city: 'New York', state: 'NY', zipCode: 10001, creditCard: 1234567890123456, cvc: 123},
  {firstName: 'Hubert', lastName: 'Hansen', email: 'ImTheRealMonster@yahoo.com', isAdmin: false, streetAddress: '14-14 Hazen Street', city: 'New York', state: 'NY', zipCode: 11370, creditCard: 4321567890123456, cvc: 456},
  {firstName: 'Cookie', lastName: 'Monster', email: 'ImUsingThisSiteLikeTinder@hotmail.com', isAdmin: false, streetAddress: '123 Sesame Street', city: 'New York', state: 'NY', zipCode: 10002, creditCard: 4321567890123458, cvc: 789},
  {firstName: 'Professional', lastName: 'Man', email: 'admin@hotmail.com', isAdmin: true, streetAddress: '13 fake Street', city: 'New Bork', state: 'AA', zipCode: 12345, creditCard: 4321567390123458, cvc: 719}
], user => db.model('users').create(user))

db.didSync
  .then(() => db.sync({force: false}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
