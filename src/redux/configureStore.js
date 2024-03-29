import { createStore,applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  whilelist: ['cartReducer']
}

//redux setup

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
  let store = createStore(
      persistedReducer,
      composeWithDevTools(applyMiddleware(thunk)))

  let persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore