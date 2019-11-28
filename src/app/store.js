import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = configureStore({
    reducer: persistedReducer
  })
  
  let persistor = persistStore(store)
  return { store, persistor }
}

// const store = configureStore({
//   reducer: rootReducer
// })

// export default store