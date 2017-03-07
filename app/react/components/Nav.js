import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { showModal } from '../../reducers/modals'

import { logout } from '../../reducers/auth'


class Nav extends React.Component {

    constructor(props) {
        super(props)
        this.showLogin = this.showLogin.bind(this)
    }

    showLogin(event){
        event.preventDefault()
        this.props.showModal('LOGIN')
    }    

    render(){
         return (
            <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
                <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    </button>
                    <Link className="navbar-brand" to="/">Pet Monster</Link>
                </div>
                <div id="nav-items" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">

                    <li><Link to="/">Home</Link></li>

                    <li><Link to="products">Products</Link></li>
                    <li><Link to="cart">Cart</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                    <li>

                    { this.props.isLoggedIn ?
                        <a href="#" onClick={this.props.logout}>
                            <span className="glyphicon glyphicon-log-out" />&nbsp;&nbsp;Logout
                        </a>
                        :
                        <a href="#" onClick={this.showLogin}>
                            <span className="glyphicon glyphicon-log-in" />&nbsp;&nbsp;Login / Signup
                        </a>
                    }

                    </li>
                    </ul>
                </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    isLoggedIn: Boolean(state.auth)
})

const mapDispatchToProps = dispatch => ({
    showModal: modalType => dispatch(showModal(modalType)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)

