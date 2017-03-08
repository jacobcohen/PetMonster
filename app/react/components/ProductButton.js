import React from 'react'
import {Link} from 'react-router'
import numeral from 'numeral'

export const ProductButton = props => {

    const product = props.product
    const userId = props.userId
    const handleSubmit = props.handleSubmit
    const cart = props.cart
console.log('cart is', cart) // when not logged in, this is an array. when logged in, this is an object
    return (
        <div id="product-button">
            <Link to={`/products/${product.id}`}>
              <div
                  style={{
                      backgroundImage: `url(${product.imageURLs ? product.imageURLs[0] : ''})`,
                      backgroundPosition: 'center',
                      width: 300,
                      height: 300
                  }}
              />
            </Link>
            <div className="caption">
                <h4>{ product.name }</h4>
                <p><em>{ product.description }</em></p>
                <p>Stock: { product.stock }</p>
                <p>{ numeral(product.price / 100).format('$0,0.00') }</p>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(event.target.quantity.value, userId, {products: cart}, product)
                }}>
                    Quantity:&nbsp;
                    <input type="text" name="quantity" maxLength="3" size="3" />
                    <button
                        type="submit"
                        value="Add"
                        className="btn btn-custom btn-xs">
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}
