// import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import PreviewComponent from 'features/previewComponent/PreviewComponent'

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <PreviewComponent />
      </div>
    </Provider>
  )
}
