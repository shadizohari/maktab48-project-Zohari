import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './assets/font-fa/font.css';
import './assets/sass/main.scss';
import { Provider } from 'react-redux';
import { ConfigureStore } from './store/ConfigureStore';
import Login from './pages/management-panel/Login';
import ManagementPanel from './pages/management-panel/ManagementPanel';
import { ProtectedRoute } from './ProtectedRoute';
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
  },
});

export default function App() {
  let store = ConfigureStore();
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>
              {/* <Route path="/" exact component={textfield} /> */}
              <Route path="/Admin-panel" exact component={Login} />
              <ProtectedRoute path="/Admin-panel/Ware-Management" exact component={ManagementPanel} />
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}



