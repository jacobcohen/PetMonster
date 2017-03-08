import React from 'react'
import {Link} from 'react-router'
import numeral from 'numeral'

export const ProductButton = props => {

    const product = props.product
    const userId = props.userId
    const handleSubmit = props.handleSubmit
    const cart = props.cart

    return (
        <div id='product-button'>
            <Link to={`/products/${product.id}`}>
            <div className="imgthumb img-responsive">
                <img src={ product.imageURLs ? product.imageURLs[0] : '' } />
            </div>
            </Link>
            <div className="caption">
                { product.name }
                <br />
                Stock: { product.stock }
                <br />
                <p>{ numeral(product.price / 100).format('$0,0.00') }</p>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(event.target.quantity.value, userId, cart, product)
                }}>
                    #: <input type="text" name="quantity" maxLength="3" size="3" />
                    <input
                        type="submit"
                        value="Add To Cart"
                        className="btn btn-secondary"
                    />
                </form>
            </div>
        </div>
    )
}