import axios from 'axios'

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
      })
      .catch(() => dispatch(authenticated(null)))

export const login = (email, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {email, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const signup = (firstName, lastName, email, password) =>
  dispatch =>
    axios.post('/api/users',
      {firstName, lastName, email, password})
      .then(() => dispatch(login(email, password)))
      .catch(() => dispatch(login(email, password))) // ?? may need to be tweaked

export default reducer
