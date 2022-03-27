import React, { createContext } from 'react';
import { CssBaseline } from '@material-ui/core';
import ReactDOM from 'react-dom';
import App from './App';
import RootStore from './store';

const store = RootStore.create({});
export const StoreContext = createContext(store);

ReactDOM.render(
    <StoreContext.Provider value={store}>
      <CssBaseline />
      <App />
    </StoreContext.Provider>,
  document.getElementById('root')
);
