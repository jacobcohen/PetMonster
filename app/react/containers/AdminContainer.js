import React from 'react'
import {connect} from 'react-redux'
import {Reviews} from '../components/Reviews.js'
import {addToCart} from '../../reducers/cart'
import {AdminProduct} from '../components/AdminProducts'
import axios from 'axios'
import {updateProd} from  '../../reducers/products'

export const AdminContainer = (props) => {
  return (
        <div id="admin-container">
        {
            props.products.length &&
            props.products.map(product => (
                <AdminProduct
                    key={product.id}
                    product={product}
                    handleSubmit={props.updateTheProd}
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
  updateTheProd: (prodId, newStock, newPrice) => {
    return dispatch(updateProd(prodId, newStock, newPrice))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
