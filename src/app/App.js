// import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './store'
import PreviewComponent from 'features/previewComponent/PreviewComponent'
import EmployeePage from 'features/employee/components/EmployeePage'

const { store, persistor } = createStore()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {/* <PersistGate loading={null}> */}
        <div>
          <EmployeePage />
        </div>
      </PersistGate>
    </Provider>
  )
}
