import React from 'react'

class Modal extends React.Component {

    constructor(props) {
        super(props)
        this.onOverlayClick = this.onOverlayClick.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.onClose) {
            window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
        }
    }

    componentWillUnmount() {
        if (this.props.onClose) {
            window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
        }
    }

    listenKeyboard(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            this.props.onClose()
        }
    }

    onOverlayClick() {
        console.log(this.props.onClose.toString())
        this.props.onClose()
    }

    onDialogClick(event) {
        event.stopPropagation()
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.onClose()
    }

    render (){

        return (
            <div>
                <div className="modal-overlay-div" />
                <div className="modal-content-div" onClick={this.onOverlayClick}>
                    <div className="modal-dialog-div" onClick={this.onDialogClick}>

                        { 
                            React.cloneElement(this.props.children, {onSubmit: this.onSubmit}) 
                        }

                    </div>
                </div>
            </div>
        )
    }
}



export default Modal
