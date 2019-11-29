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
  setPagination,
  selectors
} from '../../redux'
import EmployeeForm from '../EmployeeForm'

function EmployeeList() {
  const dispatch = useDispatch()
  const employeeList = useSelector(selectors.getEmployeeList)
  const employeeLisByPage = useSelector(selectors.getEmployeeListByPage)
  const selectedIds = useSelector(selectors.getSelectedIds)
  const countPage = useSelector(selectors.getCountPage)
  const currentPage = useSelector(selectors.getCurrentPage)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    if (!modalIsOpen && selectedId) {
      setSelectedId('')
    }
  }, [modalIsOpen, selectedId])

  const pageList = new Array(4).fill(currentPage).map((v, i) => v + i)

  return (
    <div>
      <div className="employee-list__header">
        <div style={{ display: 'flex' }}>
          <label class="checkbox">
            <input type="checkbox" checked={employeeList.length && employeeList.length === selectedIds.length} onClick={() => dispatch(toggleSelectedEmployees())}  />
            <span>Select All</span>
          </label>
          <span className="spacer" />
          <Button text="DELETE" variant="secondary" disabled={!selectedIds.length} onClick={() => dispatch(deleteEmployees())} />
          <span className="spacer" />
          <Button text="Add new employee" variant="secondary" onClick={() => setModalIsOpen(true)} />
          <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
            <p style={{ margin: 8, color: '#333333' }} onClick={() => dispatch(setPagination(currentPage > 1 ? currentPage - 1 : 1 ))}>PREV</p>
            {pageList.map(page => (
              <p style={{ margin: 8, color: currentPage === page ? '#ff4232' : '#333333' }} key={page} onClick={() => {}}>{page}</p>
            ))}
            <p style={{ margin: 8, color: '#333333' }} onClick={() => dispatch(setPagination(currentPage + 1))}>NEXT</p>
          </div>
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
          {employeeLisByPage.map(employee => (
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
