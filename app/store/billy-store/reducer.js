import { actionTypes } from './action';

export const initialState = {
  isAuth: !!localStorage.getItem('token'),
  user: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')),
  permissions: localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions')) : [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return Object.assign({}, state, {
        isAuth: true,
        user: action.data,
        permissions: action.data.permissions,
      })

    case actionTypes.LOGOUT:
      return Object.assign({}, state, {
        isAuth: false
      })

    case actionTypes.GET_DATA:
      if (!action.id) {
        return Object.assign({}, state, {
          staticData: {
            ...state.staticData,
            [action.key]: action.data
          }
        })
      } else {
        return Object.assign({}, state, {
          staticData: {
            ...state.staticData,
            [action.key]: {
              ...state.staticData[action.key],
              [action.id]: action.data
            }
          }
        })
      }

    default:
      return state
  }
}
