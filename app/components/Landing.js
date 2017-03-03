import React, { Component } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Login from './Login'
import WhoAmI from './WhoAmI'

const Landing = class Layout extends Component {

  render () {
    return (
      <div>
        <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">PetMonster</Link>
            </div>
            <div id="nav-items" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><Link to="products">Products</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container content jumbotron">
          <nav>{this.props.user ? <WhoAmI /> : <Login />}</nav>
          { this.props.children }
        </div>
        <hr />
        <div id="footer" className="container text-muted">
          PetMonster by Fullstack Academy
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.auth
})

export default connect(mapStateToProps)(Landing)
