'use strict'; // eslint-disable-line semi

const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {firstName: 'Gabe', lastName: 'Lebec', email: 'ILikeSwords@aol.com', isAdmin: false, streetAddress: '3 Javascript Lane', city: 'New York', state: 'NY', zipCode: 10001, creditCard: 1234567890123456, cvc: 123},
  {firstName: 'Hubert', lastName: 'Hansen', email: 'ImTheRealMonster@yahoo.com', isAdmin: false, streetAddress: '14-14 Hazen Street', city: 'New York', state: 'NY', zipCode: 11370, creditCard: 4321567890123456, cvc: 456},
  {firstName: 'Cookie', lastName: 'Monster', email: 'ImUsingThisSiteLikeTinder@hotmail.com', isAdmin: false, streetAddress: '123 Sesame Street', city: 'New York', state: 'NY', zipCode: 10002, creditCard: 4321567890123458, cvc: 789},
  {firstName: 'Professional', lastName: 'Man', email: 'admin@hotmail.com', isAdmin: true, streetAddress: '13 fake Street', city: 'New Bork', state: 'AA', zipCode: 12345, creditCard: 4321567390123458, cvc: 719}
], user => db.model('users').create(user))

const seedProducts = () => db.Promise.map([
  {name: 'The Mummy', imageURLs: ['https://s-media-cache-ak0.pinimg.com/originals/08/e7/93/08e7938cbbf8c8a6102798e439585773.jpg'], price: 300.00, description: 'Mummy issues? Look no further! This monster will slowly shamble towards you. Like a zombie, but from Egypt. Exotic!', stock: 1},
  {name: 'The Wolfman', imageURLs: ['https://marruda3.files.wordpress.com/2013/10/the-wolf-man.jpg'], price: 200.00, description: "A dog is man's best friend, so this wolfman is his own best friend. Self-cleaning. May or may not fetch your slippers", stock: 1}
], product => db.model('products').create(product))

const seedReviews = () => db.Promise.map([
  {rating: 5, description: "it was the best monster I've ever seen. would monster again", user_id: 1, product_id: 1},
  {rating: 3, description: "it was only an ok monster. kinda hokey, would want something more modern", user_id: 1, product_id: 2},
  {rating: 1, description: "this was the worst Angie's List contractor I've ever seen. I wanted him to remodel my kitchen, and he was a monster!", user_id: 2, product_id: 1}
], review => db.model('reviews').create(review))

const seedOrders = () => db.Promise.map([
  {total: 10.00, status: "processing", user_id: 1},
  {total: 15.00, status: "active", user_id: 2},
  {total: 600.00, status: "completed", user_id: 2}
], order => db.model('orders').create(order))

const seedTransactions = () => db.Promise.map([
  {sellingPrice: 1, quantity: 5, order_id: 1, product_id: 1},
  {sellingPrice: 9001.00, quantity: 1, order_id: 1, product_id: 2},
  {sellingPrice: 200.00, quantity: 2, order_id: 2, product_id: 1},
  {sellingPrice: 207.00, quantity: 1, order_id: 3, product_id: 1},
  {sellingPrice: 6787.00, quantity: 1, order_id: 3, product_id: 2}
], transaction => db.model('transactions').create(transaction))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .then(seedReviews)
  .then(reviews => console.log(`Seeded ${reviews.length} reviews OK`))
  .then(seedOrders)
  .then(orders => console.log(`Seeded ${orders.length} orders OK`))
  .then(seedTransactions)
  .then(transactions => console.log(`Seeded ${transactions.length} transactions OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
