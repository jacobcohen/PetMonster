import React from 'react'
import {connect} from 'react-redux'

export const Users = (props) => (
  <div className="row">
    <div className="col-4">
      <ul>
        {props.users && props.users.map(user => (
          <li key={user.id}>{user.name}</li>
          )
        )}
      </ul>
    </div>
  </div>
)

const mapStateToProps = state => { console.log(state)
  return ({
  users: state.users.list
})}

export default connect(mapStateToProps)(Users)
