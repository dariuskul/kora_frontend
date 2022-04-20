import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { App } from 'App';
import './index.css';
import { configStore } from 'store/store';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ConfirmProvider } from 'material-ui-confirm';

const { store, persistor } = configStore({} as never);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfirmProvider>
        <ToastContainer position='bottom-right' />
        <App />
      </ConfirmProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
