// import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import PreviewComponent from 'features/previewComponent/PreviewComponent'
import EmployeeForm from 'features/employee/components/EmployeeForm'

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <EmployeeForm />
      </div>
    </Provider>
  )
}
