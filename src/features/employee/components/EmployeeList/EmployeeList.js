import './styles.css'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import Button from 'common/components/Button'
import { 
  deleteEmployee,
  deleteEmployees,
  toggleSelectedEmployee,
  toggleSelectedEmployees,
  selectors
} from '../../redux'
import EmployeeForm from '../EmployeeForm'

function EmployeeList() {
  const dispatch = useDispatch()
  const employeeList = useSelector(selectors.getEmployeeList)
  const selectedIds = useSelector(selectors.getSelectedIds)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    if (!modalIsOpen && selectedId) {
      setSelectedId('')
    }
  }, [modalIsOpen, selectedId])

  return (
    <div>
      <div className="employee-list__header">
        <div className="checkbox">
          <label class="checkbox">
            <input type="checkbox" checked={employeeList.length && employeeList.length === selectedIds.length} onClick={() => dispatch(toggleSelectedEmployees())}  />
            <span>Select All</span>
          </label>
          <span className="spacer" />
          <Button text="DELETE" variant="secondary" disabled={!selectedIds.length} onClick={() => dispatch(deleteEmployees())} />
          <span className="spacer" />
          <Button text="Add new employee" variant="secondary" onClick={() => setModalIsOpen(true)} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td />
            <td>NAME</td>
            <td>GENDER</td>
            <td>MOBILE PHONE</td>
            <td>NATIONAILITY</td>
            <td>EDIT</td>
            <td>DELETE</td>
          </tr>
        </thead>
        <tbody>
          {employeeList.map(employee => (
            <tr key={employee.id}>
              <td>
                <div className="checkbox">
                  <label class="checkbox">
                    <input type="checkbox" checked={selectedIds.some(id => id === employee.id)}  onClick={() => dispatch(toggleSelectedEmployee(employee.id))} />
                    <span></span>
                  </label>
                </div>
              </td>
              <td>{`${employee.firstName} ${employee.lastName}`}</td>
              <td>{employee.gender}</td>
              <td>{`+${employee.mobilePhone.prefix}${employee.mobilePhone.number}`}</td>
              <td>{`${employee.nationality.value}`}</td>
              <td>
                <Button text="EDIT" onClick={() => {
                  setSelectedId(employee.id)
                  setModalIsOpen(true)
                }} />
              </td>
              <td>
                <Button text="DELETE" variant="secondary" onClick={() => dispatch(deleteEmployee(employee.id))}  />
              </td>
            </tr>
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Employee"
      >
        <EmployeeForm id={selectedId} onSuccess={() => setModalIsOpen(false)} />
      </Modal>
    </div>
  )
}

export default EmployeeList;
