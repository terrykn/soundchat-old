import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#F2F2F2',
    },
    background: {
      default: '#F2F2F2',
    },
    text: {
      primary: '#000000',
    },
    white:{
      main:'#FFFFFF'
    },
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <AuthContextProvider>
        <div style={{ backgroundColor: theme.palette.background.default }}>
          <App />
        </div>
      </AuthContextProvider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </React.StrictMode>
  </ThemeProvider>

*/