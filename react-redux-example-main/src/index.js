import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ConnectedComponent from "./Presentational";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedComponent />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
