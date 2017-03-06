const SHOW_MODAL = 'SHOW_MODAL'
const HIDE_MODAL = 'HIDE_MODAL'

const initialModalState = {
    modalType: null,
    modalProps: {}
}

/** Reducer */
const modalReducer = (state = initialModalState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        case 'HIDE_MODAL':
            return initialModalState
        default:
            return state
    }
}

/** Action creators */
export const showModal = (type, props) => ({
  type: SHOW_MODAL,
  modalType: type,
  modalProps: props
})

export const hideModal = (type, props) => ({
  type: HIDE_MODAL
})

export default modalReducer
