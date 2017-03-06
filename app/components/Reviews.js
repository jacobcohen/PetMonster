import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router';


function getUsers(review, users){
  for(var x=0; x<users.length; x++) {if(users[x].id === review.user_id) return users[x].fullName}
}

export const Reviews = (props) => (
  <div>
    <ul>
      {
        props.reviews && props.reviews.list.map(review =>
          <li key={review.user_id + review.product_id}>
            <i>Rating: { review.rating } </i>
            <br />
            <b>User: { getUsers(review, props.users) } </b>
            <br />
            { review.description }
          </li>
        )
      }
    </ul>
  </div>
)
