import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './assets/font-fa/font.css';
import './assets/sass/main.scss';
import { Provider } from 'react-redux';
import { ConfigureStore } from './store/ConfigureStore';
import Login from './pages/management-panel/Login';
import ProductsPanel from './pages/management-panel/ProductsPanel';
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
                {/* <Route path="/" exact /> */}
                <Route path="/admin-panel" exact component={Login} />
                <ProtectedRoute path="/admin-panel/products" exact component={ProductsPanel} />
                {/* <ProtectedRoute path="/admin-panel/stock-prices" exact />
                <ProtectedRoute path="/admin-panel/orders" exact /> */}
              </Switch>
            </Router>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}

// ProductsPanel

// ManagementPanel