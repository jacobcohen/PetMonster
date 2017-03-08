import React from 'react'
import {Link} from 'react-router'

export const CartProductButton = props => {

    const item = props.item
    const userId = props.userId
    const handleSubmit = props.handleSubmit
    const cart = props.cart
    const format = props.format

    return (
        <div id='product-button'>
            <Link to={`/products/${item.id}`}>
            <div className="imgthumb img-responsive">
                <img src={ item.imageURLs ? item.imageURLs[0] : '' } />
            </div>
            </Link>
            <div className="caption">
                { item.name }
                <br />
                Quantity: { item.transactions.quantity }
                <br />
                <p>{ format(item.transactions.quantity, item.price) }</p>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(event.target.quantity.value, userId, cart, item)
                }}>
                    #: <input type="text" name="quantity" maxLength="3" size="3" />
                    <input
                        type="submit"
                        value="Update Quantity"
                        className="btn btn-secondary"
                    />
                </form>
            </div>
        </div>
    )
}
