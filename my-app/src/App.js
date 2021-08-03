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
import HomePage from './pages/store/HomePage';
import CategoryPage from './pages/store/CategoryPage';
// import SubCategoryPage from './pages/store/SubCategoryPage';
import ProductPage from './pages/store/ProductPage';
import CartPage from './pages/store/CartPage';
import OrderInfoPage from './pages/store/OrderInfoPage'
import ShaparakPage from './pages/store/ShaparakPage'
import PaymentResultPage from './pages/store/PaymentResultPage'
import NotFoundPage from './pages/store/NotFoundPage';
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
              <Route path="/" component={HomePage} exact />
              <Route path="/category/:title" component={CategoryPage} exact />
              <Route path="/category/:title/:subcategory" component={CategoryPage} exact />
              <Route path="/product/:id" component={ProductPage} exact />
              <Route path="/cart" component={CartPage} exact />
              <Route path="/cart/order_info" component={OrderInfoPage} exact />
              <Route path="/shaparak.ir" component={ShaparakPage} exact />
              <Route path="/payment_result/true" component={PaymentResultPage} exact />
              <Route path="/payment_result/false" component={PaymentResultPage} exact />


              <Route path="/admin-panel" exact component={LoginPage} />
              <ProtectedRoute path="/admin-panel/products" exact component={ProductsPage} />
              <ProtectedRoute path="/admin-panel/quantity_and_price" exact component={ProductsPage} />
              <ProtectedRoute path="/admin-panel/orders" exact component={ProductsPage} />
              <Route exact component={NotFoundPage} />


              {/* <ProtectedRoute path="/admin-panel/stock-prices" exact />
                <ProtectedRoute path="/admin-panel/orders" exact /> */}
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}
