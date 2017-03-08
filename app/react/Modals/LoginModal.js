import React from 'react'
import {connect} from 'react-redux'

import Modal from './Modal'
import Login from '../components/Login'

import { login, signup } from 'APP/app/reducers/auth'
import { hideModal } from '../../reducers/modals'

class LoginModal extends React.Component {

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
                <div className="login-modal">
                    <Login />
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
)(LoginModal)
