import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './assets/font-fa/font.css';
import './assets/sass/main.scss';
import { Provider } from 'react-redux';
import { ConfigureStore } from './store/ConfigureStore';
import LoginPage from './pages/admin/LoginPage';
import ProductsPage from './pages/admin/ProductsPage';
import TabsWrappedLabel from './pages/admin/ProductsPage'
import { ProtectedRoute } from './ProtectedRoute';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// rtl
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

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
                <Route path="/admin-panel" exact component={LoginPage} />
                <ProtectedRoute path="/admin-panel/products" exact component={ProductsPage}/>
                <ProtectedRoute path="/admin-panel/quantity_and_price" exact component={ProductsPage}/>
                <ProtectedRoute path="/admin-panel/orders" exact component={ProductsPage}/>

                {/* <ProtectedRoute path="/admin-panel/stock-prices" exact />
                <ProtectedRoute path="/admin-panel/orders" exact /> */}
              </Switch>
            </Router>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}
