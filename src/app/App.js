// import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './store'
import PreviewComponent from 'features/previewComponent/PreviewComponent'
import EmployeeForm from 'features/employee/components/EmployeeForm'

const { store, persistor } = createStore()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {/* <PersistGate loading={null}> */}
        <div>
          <EmployeeForm />
        </div>
      </PersistGate>
    </Provider>
  )
}
