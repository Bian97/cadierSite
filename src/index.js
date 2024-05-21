import React from 'react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react'; // Importa o PersistGate
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store'; // Importa a store e persistor
import { usePopper } from "react-popper"; 
import 'bootstrap/dist/css/bootstrap.css';
import './i18n';
import axiosInterceptors from './AxiosInterceptor'


const root = createRoot(document.getElementById('root'));

axiosInterceptors(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);