'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = db.model('products')

const seedUsers = () => db.Promise.map([
  {firstName: 'Gabe', lastName: 'Lebec', email: 'ILikeSwords@aol.com', isAdmin: false, streetAddress: '3 Javascript Lane', city: 'New York', state: 'NY', zipCode: 10001, creditCard: 1234567890123456, cvc: 123},
  {firstName: 'Hubert', lastName: 'Hansen', email: 'ImTheRealMonster@yahoo.com', isAdmin: false, streetAddress: '14-14 Hazen Street', city: 'New York', state: 'NY', zipCode: 11370, creditCard: 4321567890123456, cvc: 456},
  {firstName: 'Cookie', lastName: 'Monster', email: 'ImUsingThisSiteLikeTinder@hotmail.com', isAdmin: false, streetAddress: '123 Sesame Street', city: 'New York', state: 'NY', zipCode: 10002, creditCard: 4321567890123458, cvc: 789},
  {firstName: 'Professional', lastName: 'Man', email: 'admin@hotmail.com', isAdmin: true, streetAddress: '13 fake Street', city: 'New Bork', state: 'AA', zipCode: 12345, creditCard: 4321567390123458, cvc: 719}
], user => db.model('users').create(user))

const seedProducts = () => db.Promise.map([
  {name: 'Mummy', imageURLs: ['https://s-media-cache-ak0.pinimg.com/originals/08/e7/93/08e7938cbbf8c8a6102798e439585773.jpg'], price: 30000, description: 'Mummy issues? Look no further! This monster will slowly shamble towards you. Like a zombie, but from Egypt. Exotic!', stock: 1},
  {name: 'Wolfman', imageURLs: ['https://marruda3.files.wordpress.com/2013/10/the-wolf-man.jpg'], price: 20000, description: "A dog is man's best friend, so this wolfman is his own best friend. Self-cleaning. May or may not fetch your slippers", stock: 1},
  {name: 'Predator', imageURLs: ['/img/Predator.jpg'], price: 75000, description: 'From the movie Predator. Keep him in a cage. He will try to hunt any moving targets. Keep away from Arnold Schwarzenegger. No mirrors or forest traps. Loves his stuffed toy (that also has active camo).', stock: 1},
  {name: 'Triffids', imageURLs: ['/img/Triffids.jpg'], price: 23000, description: 'From the movie The Day of the Triffids. Loves crashing in through windows and spreading its roots. Keep away from seawater.', stock: 10},
  {name: 'Rheodsaurus', imageURLs: ['/img/Rheodsaurus.jpg'], price: 8000, description: 'From the movie The Beast from 20,000 Fathoms. Must have large outdoor area for him to trapse around in. Large rodents for snacks (loves capybaras the best). Please do not shoot him.', stock: 10},
  {name: 'Stripe', imageURLs: ['/img/Stripe.jpg'], price: 4000, description: 'From the movie Gremlins. Do not let him get into a large body of water as you will now have too many gremlins to take care of. Does not like sunlight. Needs to constantly be told hes a good boy.', stock: 10},
  {name: 'Pumpkinhead', imageURLs: ['/img/Pumpkinhead.jpg'], price: 34000, description: 'From the movie Pumpkinhead. Has esteem issues, does not know what those shoulder bulbus things are. Needs to be oiled down every night before bed', stock: 10},
  {name: 'Pack', imageURLs: ['/img/Pack.jpg'], price: 5500, description: 'From the movie The Pack. Has no eyes, so you must put a large cone over his head so he will not bump into walls. Eats squirrels and teeth.', stock: 10},
  {name: 'The Blob', imageURLs: ['/img/Blob.jpg'], price: 100000, description: 'From the movie The Blob. Needs to be kept under heat lamp and coddled. Electric blankets are his best friends.', stock: 10},
  {name: 'Quetzacoatl', imageURLs: ['/img/Quetzacoatl.jpg'], price: 69000, description: 'From the movie Q: The Winged Serpent. Loves the cold open air. Do not yell near him as he gets upset', stock: 10},
  {name: 'Critters', imageURLs: ['/img/Critters.jpg'], price: 8000, description: 'From the movie Critters. Teeth NEED to be brushed daily. Try not to step on them as they do not like that.', stock: 10},
  {name: 'Crawling Eye', imageURLs: ['/img/CrawlingEye.jpg'], price: 5000, description: 'From the movie The Trollenberg Terror. Tentacles have a mind of their own so do not be alarmed if you are fondled while he is sleeping. Sleeps in dark and musty corners.', stock: 10},
  {name: 'Toilet Ghoul', imageURLs: ['/img/ToiletGhoul.jpg'], price: 3000, description: 'From the movie Ghoulies II. Needs its own toilet and to be given shreds of toilet paper for sustenance.', stock: 10},
  {name: 'Giant Ants', imageURLs: ['/img/GiantAnts.jpg'], price: 25000, description: 'From the movie Them! Leg hair must be brushed every week or so. Fed a constant supply of toddlers or leaves.', stock: 10},
  {name: 'Bugs', imageURLs: ['/img/Bugs.jpg'], price: 70000, description: 'From the movie Starship Troopers. Not all that evil. Hates war propaganda.', stock: 10},
  {name: 'Clover', imageURLs: ['/img/Clover.jpg'], price: 4000000, description: 'From the movie Cloverfield. Try not to film her without a tripod as she causes tremors for the camera. Eats comic relief characters, and really anything in sight. Hates the Statue of Liberty', stock: 10},
  {name: 'Pyramid Head', imageURLs: ['/img/PyramidHead.jpg'], price: 95000, description: 'From the movie Silent Hill. Does not like elevators.', stock: 10},
  {name: 'Crowley Demon', imageURLs: ['/img/CrowleyDemon.jpg'], price: 30000, description: 'From the movie Jack Brooks: Monster Slayer. Self conscious about his weight. Do not excercise in from of him or he will be upset and will need to be consoled. Great a charades', stock: 10},
  {name: 'Cyclops', imageURLs: ['/img/Cyclops.jpg'], price: 45000, description: 'From the movie The 7th Voyage of Sinbad', stock: 10},
  {name: 'Rancor', imageURLs: ['/img/Rancor.jpg'], price: 600000, description: 'From the movie Star Wars: Episode VI - Return of the Jedi', stock: 10},
  {name: 'Imhotep', imageURLs: ['/img/Imhotep.jpg'], price: 4500, description: 'From the movie The Mummy', stock: 10},
  {name: 'Dog Gargoyle', imageURLs: ['/img/DogGargoyle.jpg'], price: 500000, description: 'From the movie Ghostbusters', stock: 10},
  {name: 'Gwoemul', imageURLs: ['/img/Gwoemul.jpg'], price: 34000, description: 'From the movie The Host', stock: 10},
  {name: 'Skeletons', imageURLs: ['/img/Skeletons.jpg'], price: 45000, description: 'From the movie Jason and the Argonauts', stock: 10},
  {name: 'Terminator', imageURLs: ['/img/Terminator.jpg'], price: 45000000, description: 'From the movie The Terminator', stock: 10},
  {name: 'Jason Voorhees', imageURLs: ['/img/JasonVoorhees.jpg'], price: 5600000, description: 'From the movie Friday the 13th', stock: 10},
  {name: 'Graboids', imageURLs: ['/img/Graboids.jpg'], price: 4500000, description: 'From the movie Tremors', stock: 10},
  {name: 'Count Dracula', imageURLs: ['/img/CountDracula.jpg'], price: 34000, description: 'From the movie Dracula', stock: 10},
  {name: 'Cesare', imageURLs: ['/img/Cesare.jpg'], price: 60000, description: 'From the movie The Cabinet of Dr. Caligari', stock: 10},
  {name: 'Jaws', imageURLs: ['/img/Jaws.jpg'], price: 42000000, description: 'From the movie Jaws', stock: 10},
  {name: 'Pinhead', imageURLs: ['/img/Pinhead.jpg'], price: 540000, description: 'From the movie Hellraiser', stock: 10},
  {name: 'Baby in Eraserhead', imageURLs: ['/img/BabyInEraserhead.jpg'], price: 3200, description: 'From the movie Eraserhead', stock: 10},
  {name: 'Pterodactyl', imageURLs: ['/img/Pterodactyls.jpg'], price: 34000, description: 'From the movie The Mist', stock: 10},
  {name: 'T-Rex', imageURLs: ['/img/TRex.jpg'], price: 5500000, description: 'From the movie Jurassic Park', stock: 10},
  {name: 'Freddy Krueger', imageURLs: ['/img/FreddyKrueger.jpg'], price: 12000000, description: 'From the movie A Nightmare on Elm Street', stock: 10},
  {name: 'King Kong', imageURLs: ['/img/KingKong.jpg'], price: 100000000, description: 'From the movie King Kong', stock: 10},
  {name: 'Phantom', imageURLs: ['/img/Phantom.jpg'], price: 55000, description: 'From the movie The Phantom of the Opera', stock: 10},
  {name: 'Creeper', imageURLs: ['/img/Creeper.jpg'], price: 1000000, description: 'Jeepers Creepers', stock: 10},
  {name: 'Thing in the Crate', imageURLs: ['/img/ThingInTheCrate.jpg'], price: 54000, description: 'From the movie Creepshow', stock: 10},
  {name: 'Pale Man', imageURLs: ['/img/PaleMan.jpg'], price: 340000, description: 'From the movie Pans Labyrinth', stock: 10},
  {name: 'Gill-man', imageURLs: ['/img/Gillman.jpg'], price: 32200000, description: 'From the movie The Creature from the Black Lagoon', stock: 10},
  {name: 'Psychomatic Offspring', imageURLs: ['/img/PsychomaticOffspring.jpg'], price: 2000, description: 'From the movie The Brood', stock: 10},
  {name: 'Mr. Hyde', imageURLs: ['/img/MrHyde.jpg'], price: 4500000, description: 'From the movie Dr. Jekyll and Mr. Hyde', stock: 10},
  {name: 'Godzilla', imageURLs: ['/img/Godzilla.jpg'], price: 33000000, description: 'From the movie Godzilla', stock: 10},
  {name: 'Brundlefly', imageURLs: ['/img/Brundlefly.jpg'], price: 400000, description: 'From the movie The Fly', stock: 10},
  {name: 'Wolf Man', imageURLs: ['/img/WolfMan.jpg'], price: 50000, description: 'From the movie The Wolf Man', stock: 10},
  {name: 'Humanoid Crawlers', imageURLs: ['/img/HumanoidCrawlers.jpg'], price: 240000, description: 'From the movie The Descent', stock: 10},
  {name: 'Thing', imageURLs: ['/img/Thing.jpg'], price: 40000000, description: 'From the movie The Thing', stock: 10},
  {name: 'Wicked Witch of the West', imageURLs: ['/img/WickedWitchoftheWest.jpg'], price: 340000, description: 'From the movie The Wizard of Oz', stock: 10},
  {name: 'Xenomporph', imageURLs: ['/img/Xenomporph.jpg'], price: 560000000, description: 'From the movie Alien', stock: 10},
  {name: 'Count Orlok', imageURLs: ['/img/CountOrlok.jpg'], price: 5000, description: 'From the movie Nosferatu', stock: 10},
  {name: 'Frankensteins Monster', imageURLs: ['/img/FrankensteinsMonster.jpg'], price: 600000, description: 'From the movie Frankenstein', stock: 10}
], product => db.model('products').create(product))

const seedReviews = () => db.Promise.map([
  {rating: 5, description: "it was the best monster I've ever seen. would monster again", user_id: 1, product_id: 1},
  {rating: 3, description: "it was only an ok monster. kinda hokey, would want something more modern", user_id: 1, product_id: 2},
  {rating: 1, description: "this was the worst Angie's List contractor I've ever seen. I wanted him to remodel my kitchen, and he was a monster!", user_id: 2, product_id: 1}
], review => db.model('reviews').create(review))

const seedOrders = () => db.Promise.map([
  {total: 1000, status: "processing", user_id: 1},
  {total: 1500, status: "active", user_id: 2},
  {total: 60000, status: "completed", user_id: 2}
], order => db.model('orders').create(order))

const seedTransactions = () => db.Promise.map([
  {sellingPrice: 100, quantity: 5, order_id: 1, product_id: 1},
  {sellingPrice: 900100, quantity: 1, order_id: 1, product_id: 2},
  {sellingPrice: 20000, quantity: 2, order_id: 2, product_id: 1},
  {sellingPrice: 20700, quantity: 1, order_id: 3, product_id: 1},
  {sellingPrice: 678700, quantity: 1, order_id: 3, product_id: 2}
], transaction => db.model('transactions').create(transaction))

const seedCategories = () => db.Promise.map([
  {name: "Scary"},
  {name: "Spooky"},
  {name: "Pocket"},
  {name: "Energy Drink"}
], category => db.model('categories').create(category))

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
  .then(seedCategories)
  .then(categories => console.log(`Seeded ${categories.length} categories OK`))
  .then(() => Product.findById(1))
  .then((product) => product.addCategories([1, 2]))
  .then(() => Product.findById(2))
  .then((product) => product.addCategories([1, 3, 4]))
  .catch(error => console.error(error))
  .finally(() => db.close())
