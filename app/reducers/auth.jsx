import axios from 'axios'

import { browserHistory } from 'react-router'
import { getCartItems } from './cart'

const AUTHENTICATED = 'AUTHENTICATED'

const reducer = (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user
    default:
      return state
  }
}

export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
        return user
      })
      .then(user => {
        if (user) return dispatch(getCartItems(user.id))
      })
      .catch(() => dispatch(authenticated(null)))

export const login = (email, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {email, password})
      .then(() => dispatch(whoami()))
      .then(() => browserHistory.push(`/`))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .then(() => localStorage.cart = [])
      .then(() => browserHistory.push(`/`))
      .catch(() => dispatch(whoami()))

export const signup = (firstName, lastName, email, password) =>
  dispatch =>
    axios.post('/api/users',
      {firstName, lastName, email, password})
      .then(res => {
        let user = res.data
        return axios.post(`/api/orders/cart/${user.id}`)
      })
      .then(() => dispatch(login(email, password)))
      .then(() => browserHistory.push(`/`))
      .catch(() => dispatch(login(email, password))) // ?? may need to be tweaked

export default reducer
