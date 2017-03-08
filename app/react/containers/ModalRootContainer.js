import React from 'react'
import {connect} from 'react-redux'
import LoginModal from '../Modals/LoginModal'
import CartModal from '../Modals/CartModal'

const MODAL_COMPONENTS = {
    LOGIN: LoginModal,
    CART: CartModal
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span />
  }
  const ModalToUse = MODAL_COMPONENTS[modalType]
  return <ModalToUse {...modalProps} />
}

const mapStateToProps = state => ({
  modalType: state.modals.modalType,
  modalProps: state.modals.modalProps
})

export default connect(mapStateToProps)(ModalRoot)
