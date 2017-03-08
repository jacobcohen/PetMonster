import React from 'react'
import {Link} from 'react-router'

// make this smart, and control the form input button
export const CartProductButton = props => {

    const item = props.item
    const product = props.product
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
                <em>{ product.description }</em>
                <p>Quantity: { item.quantity }</p>
                <p>{ format(item.quantity, product.price) }</p>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(product.id, event.target.quantity.value, userId, cart, product)
                }}>
                    Update quantity: <input type="text" name="quantity" maxLength="3" size="3" />
                    <input
                        type="submit"
                        value="Change"
                        className="btn btn-secondary"
                    />
                </form>
            </div>
        </div>
    )
}
