import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AuthPage from 'pages/AuthPage';

// pages
import DashboardPage from 'pages/DashboardPage';

import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.css';
import PrivateRoute from './components/Layout/PrivateRoute';
import UserPage from './pages/UserPage';
import ProductPage from './pages/product/ProductPage';
import ProductDetailPage from './pages/product/ProductDetailPage';
import CatalogPage from './pages/product/CatalogPage';
import InventoryPage from './pages/product/InventoryPage';
import ExportedProductPage from './pages/product/ExportedProductPage';
import ImportedProductPage from './pages/product/ImportedProductPage';
import DeliveryPage from './pages/product/DeliveryPage';
import SalaryPage from './pages/product/SalaryPage';
import ListEmployPage from './pages/timekepping/ListEmployPage';
import PublicBoardPage from './pages/timekepping/PublicBoardPage';
import ApprovalPage from './pages/timekepping/ApprovalPage';
import ConfigurationPage from './pages/timekepping/ConfigurationPage';
import AddProductPage from './pages/product/AddProductPage';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
               
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <PrivateRoute exact path="/admin" layout={MainLayout} component={DashboardPage} />
            <PrivateRoute exact path="/admin/system/user" layout={MainLayout} component={UserPage} />
            <PrivateRoute exact path="/admin/product/list" layout={MainLayout} component={ProductPage} />
            <PrivateRoute exact path="/admin/product/list/add" layout={MainLayout} component={AddProductPage} />
            <PrivateRoute exact path="/admin/product/list/detail/:id" layout={MainLayout} component={ProductDetailPage} />
            <PrivateRoute exact path="/admin/product/catalog" layout={MainLayout} component={CatalogPage} />
            <PrivateRoute exact path="/admin/product/inventory" layout={MainLayout} component={InventoryPage} />
            <PrivateRoute exact path="/admin/product/exportedProducts" layout={MainLayout} component={ExportedProductPage} />
            <PrivateRoute exact path="/admin/product/importedProducts" layout={MainLayout} component={ImportedProductPage} />
            <PrivateRoute exact path="/admin/product/delivery" layout={MainLayout} component={DeliveryPage} />
                    <PrivateRoute exact path="/admin/product/salary" layout={MainLayout} component={SalaryPage} />
                    
            <PrivateRoute exact path="/admin/employ/employs" layout={MainLayout} component={ListEmployPage} />
            <PrivateRoute exact path="/admin/system/publicBoard" layout={MainLayout} component={PublicBoardPage} />
            <PrivateRoute exact path="/admin/system/apporal" layout={MainLayout} component={ApprovalPage} />
            <PrivateRoute exact path="/admin/system/configation" layout={MainLayout} component={ConfigurationPage} />
                
            
            <Redirect to="/admin" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
