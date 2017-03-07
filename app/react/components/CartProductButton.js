import React from 'react'
import {Link} from 'react-router'

export const CartProductButton = props => {

    const item = props.item
    const product = props.product
    const userId = props.userId
    const handleSubmit = props.handleSubmit

    return (
        <div className='cart-item row'>
            <div className="cart-picture-panel">
                <Link to={`/products/${product.id}`}>
                    <div className="imgthumb img-responsive">
                        <img src={ product.imageURLs ? product.imageURLs[0] : '' } />
                    </div>
                </Link>
            </div>
            <div className="cart-description-panel">
                <h3>{ product.name }</h3>
                <div className="caption">
                    <em>{ product.description }</em>
                </div>
                <div className="price">
                    <p>${ product.price / 100 }</p>
                </div>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(product.id, event.target.quantity.value, userId)
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