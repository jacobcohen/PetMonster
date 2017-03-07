import React from 'react'
import {connect} from 'react-redux'
import {Reviews} from '../components/Reviews.js'
import {ProductButton} from '../components/ProductButton'
import {addToCart} from '../../reducers/cart'

export const AdminContainer = (props) => {
  return (      
        <div id="admin-container">
        {
            props.products.length && 
            props.products.map(product => (
                <ProductButton
                    key={product.id}
                    product={product}
                    handleSubmit={props.addToCart}
                    userId={props.user.id}
                    isAdmin={props.user.isAdmin} />
                )
            )
        }
        </div>
      )
}

const mapStateToProps = state => ({
  products: state.products.list,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  addToCart: function(productId, quantity, userId){
    dispatch(addToCart(productId, quantity, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
