import React from 'react'
import {Link} from 'react-router'

export const AdminProduct = props => {

  const product = props.product
  const userId = props.userId
  const handleSubmit = props.handleSubmit

  return (
    <div id='admin-product-button'>
      <Link to={`/products/${product.id}`}>
        <div className="img-responsive">
          <img src={ product.imageURLs ? product.imageURLs[0] : '' } />
        </div>
      </Link>
      <div className="caption">
        { product.name }
        <br />
        Stock: { product.stock }
        <br />
        <p>${ product.price / 100 }</p>
      </div>
      <form onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(product.id, event.target.quantity.value, event.target.stock.value)
      }}>
        stock: <input type="text" name="quantity" defaultValue={product.stock} maxLength="3" size="3" />
        <br />
        price in cents: <input type="text" name="stock" defaultValue={product.price} />
        <br />
        <button name="Submit" value="Submit">Update Stock and Price</button>
        <br />
      </form>
    </div>
  )
}

