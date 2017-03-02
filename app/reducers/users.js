import axios from 'axios'

const RECEIVE_USERS = 'RECEIVE_USERS'
const RECEIVE_USER = 'RECEIVE_USER'

const fakeUsers = [
  {id: 1, name: 'Jake'},
  {id: 2, name: 'Merle'}
]

const initialUsersState = {
  selected: {},
  list: fakeUsers
}

const reducer = (state = initialUsersState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_USERS:
      newState.list = action.users
      break
    case RECEIVE_USER:
      newState.selected = action.user
      break
    default:
      return state
  }

  return newState
}

export const receiveUsers = users => ({
  type: RECEIVE_USERS, users
})

export const receiveProduct = user => ({
  type: RECEIVE_USER, user
})

export default reducer
