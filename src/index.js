import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';

import { AuthProvider } from './shered/context/AuthContext';
import theme from './shered/theme';
import App from './App';

import './index.css';

ReactDOM.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
