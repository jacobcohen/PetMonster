'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = db.model('products')

const seedUsers = () => db.Promise.map([
  {firstName: 'Gabe', lastName: 'Lebec', email: 'ILikeSwords@aol.com', isAdmin: false, streetAddress: '3 Javascript Lane', city: 'New York', state: 'NY', zipCode: 10001, creditCard: 1234567890123456, cvc: 123, password: "1234"},
  {firstName: 'Hubert', lastName: 'Hansen', email: 'ImTheRealMonster@yahoo.com', isAdmin: false, streetAddress: '14-14 Hazen Street', city: 'New York', state: 'NY', zipCode: 11370, creditCard: 4321567890123456, cvc: 456, password: "1234"},
  {firstName: 'Cookie', lastName: 'Monster', email: 'ImUsingThisSiteLikeTinder@hotmail.com', isAdmin: false, streetAddress: '123 Sesame Street', city: 'New York', state: 'NY', zipCode: 10002, creditCard: 4321567890123458, cvc: 789, password: "1234"},
  {firstName: 'Professional', lastName: 'Man', email: 'admin@hotmail.com', isAdmin: true, streetAddress: '13 fake Street', city: 'New Bork', state: 'AA', zipCode: 12345, creditCard: 4321567390123458, cvc: 719, password: "1234"}
], user => db.model('users').create(user))

const seedProducts = () => db.Promise.map([
  {name: 'Mummy', imageURLs: ['https://s-media-cache-ak0.pinimg.com/originals/08/e7/93/08e7938cbbf8c8a6102798e439585773.jpg'], price: 30000, description: 'Mummy issues? Look no further! This monster will slowly shamble towards you. Like a zombie, but from Egypt. Exotic!', stock: 1},
  {name: 'Wolfman', imageURLs: ['https://marruda3.files.wordpress.com/2013/10/the-wolf-man.jpg'], price: 20000, description: "A dog is man's best friend, so this wolfman is his own best friend. Self-cleaning. May or may not fetch your slippers.", stock: 1},
  {name: 'Predator', imageURLs: ['/img/Predator.jpg'], price: 75000, description: 'From the movie Predator. Keep him in a cage. He will try to hunt any moving targets. Keep away from Arnold Schwarzenegger. No mirrors or forest traps. Loves his stuffed toy (that also has active camo).', stock: 1},
  {name: 'Triffids', imageURLs: ['/img/Triffids.jpg'], price: 23000, description: 'From the movie The Day of the Triffids. Loves crashing in through windows and spreading its roots. Keep away from seawater.', stock: 10},
  {name: 'Rheodsaurus', imageURLs: ['/img/Rheodsaurus.jpg'], price: 8000, description: "From the movie The Beast from 20,000 Fathoms. Must have large outdoor area for him to trapse around in. Large rodents for snacks (loves capybaras the best). Please don't shoot him.", stock: 10},
  {name: 'Stripe', imageURLs: ['/img/Stripe.jpg'], price: 4000, description: "From the movie Gremlins. Don't let him get into a large body of water as you will now have too many gremlins to take care of. Doesn't like sunlight. Needs to constantly be told he's a good boy.", stock: 10},
  {name: 'Pumpkinhead', imageURLs: ['/img/Pumpkinhead.jpg'], price: 34000, description: 'From the movie Pumpkinhead. Has esteem issues, does not know what those shoulder bulbus things are. Needs to be oiled down every night before bed.', stock: 10},
  {name: 'Pack', imageURLs: ['/img/Pack.jpg'], price: 5500, description: 'From the movie The Pack. Has no eyes, so you must put a large cone over his head so he will not bump into walls. Eats squirrels and teeth.', stock: 10},
  {name: 'The Blob', imageURLs: ['/img/Blob.jpg'], price: 100000, description: 'From the movie The Blob. Needs to be kept under heat lamp and coddled. Electric blankets are his best friends.', stock: 10},
  {name: 'Quetzacoatl', imageURLs: ['/img/Quetzacoatl.jpg'], price: 69000, description: "From the movie Q: The Winged Serpent. Loves the cold open air. Don't yell near him as he gets upset.", stock: 10},
  {name: 'Critters', imageURLs: ['/img/Critters.jpg'], price: 8000, description: 'From the movie Critters. Teeth NEED to be brushed daily. Try not to step on them as they do not like that.', stock: 10},
  {name: 'Crawling Eye', imageURLs: ['/img/CrawlingEye.jpg'], price: 5000, description: 'From the movie The Trollenberg Terror. Tentacles have a mind of their own so do not be alarmed if you are fondled while he is sleeping. Sleeps in dark and musty corners.', stock: 10},
  {name: 'Toilet Ghoul', imageURLs: ['/img/ToiletGhoul.jpg'], price: 3000, description: 'From the movie Ghoulies II. Needs its own toilet and to be given shreds of toilet paper for sustenance.', stock: 10},
  {name: 'Giant Ants', imageURLs: ['/img/GiantAnts.jpg'], price: 25000, description: 'From the movie Them! Leg hair must be brushed every week or so. Fed a constant supply of toddlers or leaves.', stock: 10},
  {name: 'Bugs', imageURLs: ['/img/Bugs.jpg'], price: 70000, description: 'From the movie Starship Troopers. Not all that evil. Hates war propaganda.', stock: 10},
  {name: 'Clover', imageURLs: ['/img/Clover.jpg'], price: 4000000, description: 'From the movie Cloverfield. Try not to film her without a tripod as she causes tremors for the camera. Eats comic relief characters, and really anything in sight. Hates the Statue of Liberty.', stock: 10},
  {name: 'Pyramid Head', imageURLs: ['/img/PyramidHead.jpg'], price: 95000, description: 'From the movie Silent Hill. Does not like elevators.', stock: 10},
  {name: 'Crowley Demon', imageURLs: ['/img/CrowleyDemon.jpg'], price: 30000, description: 'From the movie Jack Brooks: Monster Slayer. Self conscious about his weight. Do not excercise in from of him or he will be upset and will need to be consoled. Great at charades.', stock: 10},
  {name: 'Cyclops', imageURLs: ['/img/Cyclops.jpg'], price: 45000, description: 'From the movie The 7th Voyage of Sinbad. Giant with one eye. Leader of the X-Men. Kinda sucks. Easily confuses humans with goats. Has no idea how far away things are.', stock: 10},
  {name: 'Rancor', imageURLs: ['/img/Rancor.jpg'], price: 600000, description: 'From the movie Star Wars: Episode VI - Return of the Jedi. Buy now and get a fat, shirtless man who cries.', stock: 10},
  {name: 'Imhotep', imageURLs: ['/img/Imhotep.jpg'], price: 4500, description: "From the movie The Mummy. This isn't your daddy's Mummy. He's bald, doesn't have bandages, and presumably has abs.", stock: 10},
  {name: 'Dog Gargoyle', imageURLs: ['/img/DogGargoyle.jpg'], price: 500000, description: "From the movie Ghostbusters. Whether you're the keymaster or the gatekeeper, you'll want to take this cutie home. He's a stone dog. Great for apartments. Don't have to walk him probably? I don't know, I just catch these things.", stock: 10},
  {name: 'Gwoemul', imageURLs: ['/img/Gwoemul.jpg'], price: 34000, description: "From the movie The Host. A korean river monster. He'll scare you, and Dim Sum. He's not in English, so you'll look smart.", stock: 10},
  {name: 'Skeletons', imageURLs: ['/img/Skeletons.jpg'], price: 45000, description: 'From the movie Jason and the Argonauts. These herky-jerky jerks will slowly shamble towards you like a drunk at a strobe light party. What? AM I THE ONLY ONE WHO USED TO GET DRUNK AND HAVE STROBE LIGHT PARTIES??????', stock: 10},
  {name: 'Terminator', imageURLs: ['/img/Terminator.jpg'], price: 45000000, description: "From the movie The Terminator. A robot from the future. Are YOU Sarah Connor? If so, don't buy this. Everyone else? OK. But I cannot stress enough, DO NOT BUY THIS IF YOU ARE SARAH CONNOR.", stock: 10},
  {name: 'Jason Voorhees', imageURLs: ['/img/JasonVoorhees.jpg'], price: 5600000, description: "From the movie Friday the 13th. Whether in a lake or space, this undead, mentally handicapped hillbilly is enemies with teenage girls, Freddie Krugar and Satan himself. Maybe he'll get along with you. Great with moms.", stock: 10},
  {name: 'Graboids', imageURLs: ['/img/Graboids.jpg'], price: 4500000, description: 'From the movie Tremors. Great pets for people living on a roof. Basically just big, gross larva things. Like, what do they grow up into, man? Lightly used by Kevin Bacon.', stock: 10},
  {name: 'Count Dracula', imageURLs: ['/img/CountDracula.jpg'], price: 34000, description: "From the movie Dracula. This guy is pale, lives in a basement, dresses well, but weirdly, can hypnotize your girlfriend, and the word 'cloak' is in his vocabulary... Basically, he's a pickup artist. Except he needs consent to enter a household. Sick burn, me.", stock: 10},
  {name: 'Cesare', imageURLs: ['/img/Cesare.jpg'], price: 60000, description: "From the movie The Cabinet of Dr. Caligari. Let's be real here for a second. Have any of you actually seen this movie? Let's just call this one a 'mystery box': order it, open it up, and see what you get! No refunds. You can get a refund for any other product, but not this one.", stock: 10},
  {name: 'Jaws', imageURLs: ['/img/Jaws.jpg'], price: 42000000, description: "From the movie Jaws. Buh duh. Bud duh bud duh. Bud duh bud duh bud duh bud duh bud duh bud duh do-de-lo-de-doooo! Have you bought this yet? Either you're going to buy this shark or you're not.", stock: 10},
  {name: 'Pinhead', imageURLs: ['/img/Pinhead.jpg'], price: 540000, description: "From the movie Hellraiser. Buy this and enter a world beyond pleasure and pain. Store sewing needles on his face. Buy now and get a free rubix cube. It's totally a rubix cube. It's not a cube I opened to enter a world beyond pleasure and pain. Buy this. Please buy it.", stock: 10},
  {name: 'Baby in Eraserhead', imageURLs: ['/img/BabyInEraserhead.jpg'], price: 3200, description: "From the movie Eraserhead. Don't try to change it's diaper, that's part of it. May grow to the size of your room unexpectedly. Also, what did this guy have sex with?", stock: 10},
  {name: 'Pterodactyl', imageURLs: ['/img/Pterodactyls.jpg'], price: 34000, description: 'From the movie The Mist. A flying monster. Not particularly memorable.', stock: 10},
  {name: 'T-Rex', imageURLs: ['/img/TRex.jpg'], price: 5500000, description: 'From the movie Jurassic Park. Faster. Faster! Buy faster! Created by Colonel Sanders to be the ultimate chicken.', stock: 10},
  {name: 'Freddy Krueger', imageURLs: ['/img/FreddyKrueger.jpg'], price: 12000000, description: "From the movie A Nightmare on Elm Street. The monster of your dreams. A burn victim with a sweater. Did you fall asleep? Are you asleep right now? Ok, I'll wait.", stock: 10},
  {name: 'King Kong', imageURLs: ['/img/KingKong.jpg'], price: 100000000, description: "From the movie King Kong. A big ape. My question is, what does he want with such a tiny lady? I mean, what is he hoping to achieve? So, I guess, don't buy this if you're a tiny little lady. Or do? Ain't got nothin on Denzel.", stock: 10},
  {name: 'Phantom', imageURLs: ['/img/Phantom.jpg'], price: 55000, description: "From the movie The Phantom of the Opera. Basically the Hunchback of Notre Dame, but a rape-y murderer. Really hogs your pipe organ. Won't let you borrow his mask. I've asked. Overall: selfish. Swipe left. I mean: buy this.", stock: 10},
  {name: 'Creeper', imageURLs: ['/img/Creeper.jpg'], price: 1000000, description: "From the movie Jeepers Creepers. Feeds off of people's fear. Flies. Drives a creepy truck. Mainly known for stealing Justin Long's eyes. That guy is a REALLY good actor. I would never have known those things are fake.", stock: 10},
  {name: 'Thing in the Crate', imageURLs: ['/img/ThingInTheCrate.jpg'], price: 54000, description: "From the movie Creepshow. An ape in a box. Kills people really slowly. Other people will inexplicably continue to watch while he does it. Weakness: places that don't have boxes.", stock: 10},
  {name: 'Pale Man', imageURLs: ['/img/PaleMan.jpg'], price: 340000, description: "From the movie Pan's Labyrinth. Has eyes in his hands. Based on his loose skin, he's lost weight. Tries to kill anyone who eats in front of him. The inference is clear: he has an eating disorder. Also: fascism is bad.", stock: 10},
  {name: 'Gill-man', imageURLs: ['/img/Gillman.jpg'], price: 32200000, description: "From the movie The Creature from the Black Lagoon. Commonly known as 'The creature.' Mortal enemy: the net. Has the stregth of one man. The speed of one man. What I'm saying is: he's not very exciting.", stock: 10},
  {name: 'Psychomatic Offspring', imageURLs: ['/img/PsychomaticOffspring.jpg'], price: 2000, description: "From the movie The Brood. Terrifying if you can't fight off small children. Underwhelming if you can. Two-for-one. Good at finger painting.", stock: 10},
  {name: 'Mr. Hyde', imageURLs: ['/img/MrHyde.jpg'], price: 4500000, description: 'From the movie Dr. Jekyll and Mr. Hyde. Basically The Hulk. But with clothes. And a hat. A trendy hat.', stock: 10},
  {name: 'Godzilla', imageURLs: ['/img/Godzilla.jpg'], price: 33000000, description: "From the movie Godzilla. King Kong, but an amphibian. How does an amphibian come from the ocean, by the way? Amphibians are fresh water. These and other zoological facts can be yours if buy Godzilla now, as we'll throw in our guide 'How to care for your Godzilla.' Don't fall for fakes. Mechagodzilla IS NOT GODZILLA.", stock: 10},
  {name: 'Brundlefly', imageURLs: ['/img/Brundlefly.jpg'], price: 400000, description: "From the movie The Fly. We'd say the one time Jeff Goldblum was not sexy, but who are we kidding?", stock: 10},
  {name: 'Wolf Man', imageURLs: ['/img/WolfMan.jpg'], price: 50000, description: 'From the movie The Wolf Man. This is a duplicate listing. Two people upset a gypsy.', stock: 10},
  {name: 'Humanoid Crawlers', imageURLs: ['/img/HumanoidCrawlers.jpg'], price: 240000, description: 'From the movie The Descent. A bunch of buff smeagols. They wait for ladies who have found self-affirmation.', stock: 10},
  {name: 'Thing', imageURLs: ['/img/Thing.jpg'], price: 40000000, description: "From the movie The Thing. Could be disguising itself as anything. So maybe you've already bought this. Give us money anyway. It's funny: as The Thing, Wilfred Brimley was briefly the main villain in a movie.", stock: 10},
  {name: 'Wicked Witch of the West', imageURLs: ['/img/WickedWitchoftheWest.jpg'], price: 340000, description: "From the movie The Wizard of Oz. Weirdly and violently obsessed with slippers. Allergic to water, so don't buy if you own a spa, or live in Seattle.", stock: 10},
  {name: 'Xenomporph', imageURLs: ['/img/Xenomporph.jpg'], price: 560000000, description: "From the movie Alien. You still don't understand what you're dealing with, do you? Perfect organism. Its structural perfection is matched only by its hostility. Also, clearly its character design is based on a human penis.", stock: 10},
  {name: 'Count Orlok', imageURLs: ['/img/CountOrlok.jpg'], price: 5000, description: 'From the movie Nosferatu. Quiet, deep thinker. Gives great massages. If you think he looks bad in black and white, just WAIT until you see him in color.', stock: 10},
  {name: 'Frankensteins Monster', imageURLs: ['/img/FrankensteinsMonster.jpg'], price: 600000, description: "From the movie Frankenstein. Hand-crafted, artisinal zombie. A warning though: he's not the same since he got married.", stock: 10}
], product => db.model('products').create(product))

const seedReviews = () => db.Promise.map([
  {rating: 5, description: "it was the best monster I've ever seen. would monster again", user_id: 1, product_id: 1},
  {rating: 3, description: 'it was only an ok monster. kinda hokey, would want something more modern', user_id: 1, product_id: 2},
  {rating: 1, description: "this was the worst Angie's List contractor I've ever seen. I wanted him to remodel my kitchen, and he was a monster!", user_id: 2, product_id: 1}
], review => db.model('reviews').create(review))

const seedOrders = () => db.Promise.map([
  {total: 1000, status: 'processing', user_id: 1},
  {total: 1500, status: 'active', user_id: 2},
  {total: 60000, status: 'completed', user_id: 2}
], order => db.model('orders').create(order))

const seedTransactions = () => db.Promise.map([
  {sellingPrice: 100, quantity: 5, order_id: 1, product_id: 1},
  {sellingPrice: 900100, quantity: 1, order_id: 1, product_id: 2},
  {sellingPrice: 20000, quantity: 2, order_id: 2, product_id: 1},
  {sellingPrice: 20700, quantity: 1, order_id: 3, product_id: 1},
  {sellingPrice: 678700, quantity: 1, order_id: 3, product_id: 2}
], transaction => db.model('transactions').create(transaction))

const seedCategories = () => db.Promise.map([
  {name: 'Spooky'},
  {name: 'Classic'},
  {name: 'Tiny'},
  {name: 'Huge'},
  {name: 'Sticky'},
  {name: 'Swarm'},
  {name: 'Organic'},
  {name: 'Robotic'}
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
  .then((product) => product.addCategories([1, 2, 7]))
  .then(() => Product.findById(2))
  .then((product) => product.addCategories([1, 2, 7]))
  .then(() => Product.findById(3))
  .then((product) => product.addCategories([7]))
  .then(() => Product.findById(4))
  .then((product) => product.addCategories([6, 7]))
  .then(() => Product.findById(5))
  .then((product) => product.addCategories([4, 7]))
  .then(() => Product.findById(6))
  .then((product) => product.addCategories([3, 7]))
  .then(() => Product.findById(7))
  .then((product) => product.addCategories([1, 7]))
  .then(() => Product.findById(8))
  .then((product) => product.addCategories([6, 7]))
  .then(() => Product.findById(25))
  .then((product) => product.addCategories([8]))
  .catch(error => console.error(error))
  .finally(() => db.close())
