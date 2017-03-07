import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {checkValidReviewer} from '../../reducers/reviews.js'

class ReviewBox extends Component {

  constructor(props){

    super(props)
    console.log(props)
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
    this.props.addReview(userId, prodId, rating, description)
    this.setState({
      notValidUser: this.props.newThing
    })

  }


  render () {

    return (
      <div>
        { this.state.validUser ?
          <form onSubmit={this.handleSubmit}>
            <input name="rating" type="rating" />
            <input name="description" type="description" />
            <button name="Submit" value="Submit">Submit</button>
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

const mapDispatchToProps = dispatch =>  ({
    addReview: (userId, prodId, rating, desc) => {
      axios.post(`/api/reviews/user/${userId}/product/${prodId}`, {rating: rating, description: desc})
        .then(success => {
            if(success.data === false)
              dispatch(checkValidReviewer(false))
            else{
              dispatch(checkValidReviewer(true))
            }
        })
        .catch(failure => {
          console.log('howd we get herr')
        })
    }
  })



export default connect(mapStateToProps, mapDispatchToProps)(ReviewBox)
