import uuidv4 from 'uuid/v4'

const INITIAL_STATE = {
  byId: {},
}

export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE'

export const createNewEmployee = (employeeDetail) => ({
  type: CREATE_EMPLOYEE,
  payload: {
    id: uuidv4(),
    ...employeeDetail,
  }
})
export const updateNewEmployee = (id, employeeDetail) => ({
  type: UPDATE_EMPLOYEE,
  payload: {
    id,
    ...employeeDetail,
  }
})

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      }
    }
    case UPDATE_EMPLOYEE: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            ...action.payload,
          }
        }
      }
    }
    default:
      return state
  }
}

export const selectors = {
  getEmployeeById: id => state => state.employee.byId[id],
  getEmployeeList: state => Object.values(state.employee.byId),
}

export default reducer
