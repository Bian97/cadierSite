import { combineReducers, configureStore, applyMiddleware } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer";
import menuReducer from "./reducers/MenuReducer";
import filiadoReducer from './reducers/ControleFiliadoReducer';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Middleware de logging
const loggingMiddleware = store => next => action => {
  console.log('Disparou ação:', action);
  const result = next(action);
  console.log('Novo estado:', store.getState());
  return result;
};

// Configuração de persistência para os reducers que deseja persistir
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  filiado: filiadoReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware.withExtraArgument({ axios }), loggingMiddleware], // Adiciona o middleware de logging
});

const persistor = persistStore(store);

export { store, persistor };
