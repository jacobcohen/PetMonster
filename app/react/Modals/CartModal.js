import React from 'react'
import {connect} from 'react-redux'

import Modal from './Modal'
import Cart from '../components/Cart'

import { login, signup } from 'APP/app/reducers/auth'
import { hideModal } from '../../reducers/modals'

class CartModal extends React.Component {

    constructor(props){
        super(props)
        this.onClose = this.onClose.bind(this)
    }

    onClose() {
        console.log(this.props.hideModal.toString())
        this.props.hideModal()
    }

    render(){
        return (
            <Modal onClose={this.onClose}>
                <div className="cart-modal">
                    <Cart />
                </div>
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    login,
    signup,
    hideModal: () => dispatch(hideModal())
})

export default connect(
  null,
  mapDispatchToProps
)(CartModal)