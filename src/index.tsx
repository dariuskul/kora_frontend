import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { App } from 'App';
import './index.css';
import { configStore } from 'store/store';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const { store, persistor } = configStore({} as never);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer position='bottom-right' />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
