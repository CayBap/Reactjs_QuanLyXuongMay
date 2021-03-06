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
import EditProductPage from './pages/product/EditProductPage';
import EmployPage from './pages/EmployPage';
import StaffLayout from './components/Layout/StaffLayout';
import RolePage from './pages/RolePage'
import SystemConfigPage from './pages/SystemConfigPage';
import ExportStockPage from './pages/product/ExportStockPage';
import UserInfoPage from './pages/UserInfoPage';
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
    state = {
        role:'admin',
    }
    componentWillMount() {
        this.setState({ role: localStorage.getItem('role') });
    }
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
              path="/"
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
            <PrivateRoute rolePage = 'admin' exact path="/admin" layout={MainLayout} component={DashboardPage} />
            <PrivateRoute rolePage = 'admin' exact  path="/admin/system/user" layout={MainLayout} component={UserPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/list" layout={MainLayout} component={ProductPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/list/add" layout={MainLayout} component={AddProductPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/list/edit/:id" layout={MainLayout} component={EditProductPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/list/detail/:id" layout={MainLayout} component={ProductDetailPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/catalog" layout={MainLayout} component={CatalogPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/inventory" layout={MainLayout} component={InventoryPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/exportedProducts" layout={MainLayout} component={ExportedProductPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/importedProducts" layout={MainLayout} component={ImportedProductPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/delivery" layout={MainLayout} component={DeliveryPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/salary" layout={MainLayout} component={SalaryPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/product/export" layout={MainLayout} component={ExportStockPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/employ/employs" layout={MainLayout} component={ListEmployPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/system/publicBoard" layout={MainLayout} component={PublicBoardPage} />
            <PrivateRoute rolePage = 'admin' exact path="/admin/system/apporal" layout={MainLayout} component={ApprovalPage} />
            <PrivateRoute rolePage='admin' exact path="/admin/system/configation" layout={MainLayout} component={ConfigurationPage} />
            <PrivateRoute rolePage='admin' exact path="/admin/system/role" layout={MainLayout} component={RolePage} />
            <PrivateRoute rolePage='admin' exact path="/admin/system/general" layout={MainLayout} component={SystemConfigPage} />
            <PrivateRoute rolePage='admin' exact path="/admin/system/userInfo" layout={MainLayout} component={UserInfoPage} />
                    

            <PrivateRoute rolePage = 'staff' path="/staff" layout={StaffLayout} component={EmployPage} />
            
            <Redirect to="/"  />
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
