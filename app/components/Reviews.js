import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router';




export const Reviews = (props) => (
  <div>
    <ul>
      {
        props.reviews && props.reviews.list.map(review =>
          <li key={review.user_id + review.product_id}>
            { review.rating }
            <br />
            { review.description }
          </li>
        )
      }
    </ul>
  </div>
)
