import React from 'react';
import './assets/font-fa/font.css';
import './index.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './store/ConfigureStore';
import Login from './pages/management-panel/Login'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// rtl
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
// .......

const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Shabnam'
  }
});

export default function App() {
  let store = ConfigureStore();
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <div>
            <Login />
          </div>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}



