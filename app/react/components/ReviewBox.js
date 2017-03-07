import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {addReview} from '../../reducers/reviews.js'

class ReviewBox extends Component {

  constructor(props){

    super(props)
    console.log("props is ",props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user_id: null,
      prod_id: props.product.id,
      validUser: true
    }
  }

  componentDidMount(){
    console.log()
    this.setState({
      prod_id: this.props.product.id
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      prod_id: nextProps.product.id,
      user_id: nextProps.auth ? nextProps.auth.id : null,
      validUser: nextProps.reviews ? nextProps.reviews.validUser : true
    })
    console.log(nextProps)
  }


  handleSubmit (evt) {
    evt.preventDefault()
    let rating = evt.target.rating.value
    let description = evt.target.description.value
    let userId = this.state.user_id
    let prodId = this.state.prod_id
    console.log('user id is', userId)
    this.props.addTheReview(userId, prodId, rating, description)
    this.setState({
      notValidUser: true
    })

  }


  render () {

    return (
      <div>
        { this.state.validUser ?
          <form onSubmit={this.handleSubmit}>
            <b>Rate the item out of 5: </b>
            <select name="rating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select><br />
            <textarea name="description" type="description" rows="6" cols="50" /><br />
            <button name="Submit" value="Submit">Add Review</button>
          </form>
        :null
        }

      </div>

    )

  }

}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.products.selected,
  validUser: state.reviews.validReviewer
})



export default connect(mapStateToProps)(ReviewBox)
