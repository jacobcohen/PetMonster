'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Product = db.define('products', {
    name: { type: Sequelize.STRING, allowNull: false },
    imageURLs: { 
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ['http://www.illuminessensce.com/wp-content/uploads/2012/12/Image-Coming-Soon-Placeholder.png']
    },
    price: { type: Sequelize.INTEGER, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    stock: { type: Sequelize.INTEGER, allowNull: false }
}, {
    instanceMethods: {
        addPicture: function(url){
            this.imageURLs.push(url)
            return this.save()
        },
        setDefaultPicture: function(indexOfPicture){
            if (indexOfPicture >= this.imageURLs.length) {
                return Promise.reject(new Error('Invalid picture index.'))
            } else {
                let [newDefault] = this.imageURLs.splice(indexOfPicture, 1)
                this.imageURLs.unshift(newDefault)
                return this.save()
            }
        },
        getAverageRating: function(){
            return this.getUserReviews().then(users => {
                let reviews = []
                users.forEach(user => {
                    reviews = reviews.concat(user.reviews)
                })
                return average(reviews.map(review => review.rating))
            })
        }
    },
    /**
     * Scope for in-stock products
     */
    scopes: {
        inStock: {
            where: { stock: {$gt: 0} }
        }
    }
})

function average(arr){
    return arr.reduce((acc, curr) => acc + curr) / arr.length
}

module.exports = Product
