import './styles.css'
import React from 'react'
import PropTypes from 'prop-types'
import EmployeeList from '../EmployeeList'
import EmployeeForm from '../EmployeeForm'

function EmployeePage() {
  return (
    <div style={{ paddingLeft: 27, paddingRight: 27 }}>
      <h1>Employee management</h1>
      <EmployeeList />
    </div>
  )
}

export default EmployeePage;
