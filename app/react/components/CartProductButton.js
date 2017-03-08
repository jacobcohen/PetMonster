import React from 'react'
import {Link} from 'react-router'

export const CartProductButton = props => {

    const item = props.item
    const userId = props.userId
    const handleSubmit = props.handleSubmit
    const cart = props.cart
    const format = props.format

    return (
        <div className="cart-item row">
            <div className="cart-picture-panel">
                <Link to={`/products/${product.id}`}>
                    <div className="imgthumb img-responsive">
                        <img src={ item.imageURLs ? item.imageURLs[0] : '' } />
                    </div>
                </Link>
            </div>
            <div className="cart-description-panel">
                <h3>{ item.name }</h3>
                <div className="caption">
                    <em>{ item.description }</em>
                </div>
                <p>Quantity: { item.transactions.quantity }</p>
                <p>Subtotal: { format(item.transactions.quantity, item.price) }</p>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(event.target.quantity.value, userId, cart, item)
                }}>
                    Quantity: <input type="text" name="quantity" maxLength="3" size="3" value={ item.quantity } />
                    <input
                        type="submit"
                        value="Update"
                        className="btn btn-secondary"
                    />
                </form>
            </div>
        </div>
    )
}
