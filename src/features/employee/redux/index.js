import uuidv4 from 'uuid/v4'

const INITIAL_STATE = {
  byId: {},
  selectedIds: [],
  pagination: {
    currentPage: 1
  }
}

export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE'
export const DELETE_EMPLOYEES = 'DELETE_EMPLOYEES'
export const TOGGLE_SELECTED_EMPLOYEE = 'TOGGLE_SELECTED__EMPLOYEE'
export const TOGGLE_SELECTED_EMPLOYEES = 'TOGGLE_SELECTED_EMPLOYEES'
export const SET_PAGINATION = 'SET_PAGINATION'

export const createNewEmployee = (employeeDetail) => ({
  type: CREATE_EMPLOYEE,
  selected: [],
  payload: {
    id: uuidv4(),
    ...employeeDetail,
  },
})
export const updateEmployee = (id, employeeDetail) => ({
  type: UPDATE_EMPLOYEE,
  payload: {
    id,
    ...employeeDetail,
  }
})
export const toggleSelectedEmployee = id => ({ type: TOGGLE_SELECTED_EMPLOYEE, payload: { id } })
export const toggleSelectedEmployees = () => ({ type: TOGGLE_SELECTED_EMPLOYEES, })
export const deleteEmployee = id => ({ type: DELETE_EMPLOYEE, payload: { id } })
export const deleteEmployees = () => ({ type: DELETE_EMPLOYEES })
export const setPagination = (page) => ({ type: SET_PAGINATION, payload: { page } })

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
    case TOGGLE_SELECTED_EMPLOYEE: {
      const selected = state.selectedIds
      const hasBeenSelected = selected.some(id => action.payload.id === id)
      return {
        ...state,
        selectedIds: hasBeenSelected
          ? selected.filter(id => id !== action.payload.id)
          : [...selected, action.payload.id]
      }
    }
    case TOGGLE_SELECTED_EMPLOYEES: {
      const selected = state.selectedIds
      const allIds = Object.keys(state.byId)
      return {
        ...state,
        selectedIds: selected.length === allIds.length ? [] : allIds,
      }
    }
    case DELETE_EMPLOYEE: {
      const { [action.payload.id]: temp, ...byId } = state.byId
      return {
        ...state,
        byId: {
          ...byId
        }
      }
    }
    case DELETE_EMPLOYEES: {
      const { selectedIds, byId } = state
      const byIdWithOutSelected = Object.values(byId).filter(v => !selectedIds.some(id => id === v.id))
      return {
        ...state,
        selectedIds: [],
        byId: byIdWithOutSelected.reduce((prev, cur) => ({ ...prev, [cur.id]: cur }), {})
      }
    }
    case SET_PAGINATION: {
      return {
        ...state,
        pagination: {
          currentPage: action.payload.page
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
  getSelectedIds: state => state.employee.selectedIds,
}

export default reducer
