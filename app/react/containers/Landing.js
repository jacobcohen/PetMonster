import React, { Component } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import WhoAmI from '../WhoAmI'
import Nav from '../components/Nav'
import ModalRootContainer from './ModalRootContainer'

const Landing = class Layout extends Component {

  render () {
    return (
      <div>
        <Nav />
        <ModalRootContainer />
        <div className="container content">

          { this.props.children }

        </div>
        <hr />
        <Footer />
      </div>
    )
  }
}

const Footer = () => (
  <div id="footer" className="container text-muted">
    PetMonster by Fullstack Academy
  </div>
)


const mapStateToProps = state => ({
  user: state.auth,
  cart: state.cart
})

export default connect(mapStateToProps)(Landing)
