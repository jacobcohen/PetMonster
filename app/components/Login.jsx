import React from 'react'

export const Login = ({ login }) => (
  <div>
    <h3>Login</h3>
    <form onSubmit={evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
    } }>
      <input name="username" type="username" placeholder="username" />
      <input name="password" type="password" placeholder="password" />
      <input type="submit" value="Login" />
    <hr />
    <h3>Or, Sign Up!</h3>
    </form>
    <form onSubmit={evt => {} }>
      <input name="firstName" type="firstName" placeholder="first name" />
      <input name="lastName" type="lastName" placeholder="last name" />
      <input name="username" type="username" placeholder="username" />
      <input name="password" type="password" placeholder="password" />
      <input type="submit" value="Submit" />
    </form>
    <hr />
    <button type="button" className="btn btn-primary">Sign Up with Google</button>
    <button type="button" className="btn btn-primary">Sign Up with Facebook</button>
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  null,
  {login},
)(Login)
