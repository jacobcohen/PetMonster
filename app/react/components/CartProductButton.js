import React from 'react'
import {Link} from 'react-router'

// make this smart, and control the form input button
export const CartProductButton = props => {

    const product = props.item.product
    const lineItem = props.item
    const userId = props.userId
    const handleSubmit = props.handleSubmit
    const cart = props.cart
    const format = props.format

    return (
        <div className={`${props.isModal ? 'cart-modal-item' : 'cart-item'}`}>
            <div className="cart-picture-panel">
                <Link to={`/products/${product.id}`}>
                    <div className="imgthumb img-responsive">
                        <img src={ product.imageURLs ? product.imageURLs[0] : '' } />
                    </div>
                </Link>
            </div>
            <div className="cart-description-panel">
                <h3>{ product.name }</h3>
                <p><em>{ product.description }</em></p>
                <p>Quantity: { lineItem.quantity }</p>
                <p>{ format(lineItem.quantity, product.price) }</p>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(event.target.quantity.value, userId, cart, product)
                }}>
                    Change quantity: <input type="text" name="quantity" maxLength="3" size="3" />
                    <input
                        type="submit"
                        value="Update"
                        className="btn btn-custom btn-xs"
                    />
                </form>
            </div>
        </div>
    )
}
