import React, { Component } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import WhoAmI from './WhoAmI'

const Landing = class Layout extends Component {

  render () {
    return (
      <div>
        <Nav />
        <div className="container content">
        <nav>
          {
            this.props.user ?
              <WhoAmI /> :
              <button><Link to="login">Login</Link></button> 
          }
        </nav>
          { this.props.children }

        </div>
        <hr />
        <Footer />
      </div>
    )
  }
}

const Nav = () => (
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
          <li><a href="/">Home</a></li>
          <li><Link to="products">Products</Link></li>
          <li><Link to="cart">Cart</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><span className="glyphicon glyphicon-user" /> Sign Up</a></li>
          <li><a href="#"><span className="glyphicon glyphicon-log-in" /> Login</a></li>
        </ul>
      </div>
    </div>
  </div>
)

const Footer = () => (
  <div id="footer" className="container text-muted">
    PetMonster by Fullstack Academy
  </div>
)


const mapStateToProps = state => ({
  user: state.auth
})

export default connect(mapStateToProps)(Landing)
