
/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class PrivateRoute extends React.Component {
  render() {
    const { component: InnerComponent, layout: Layout, ...rest } = this.props;
    const { location } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
            if (this.isLoginSystem()) {
                if (this.props.rolePage === localStorage.getItem('role')) {
                    return (
                        <Layout>
                          <InnerComponent {...props} />
                        </Layout>
                      );
                }
                if (!this.props.rolePage) {
                    return (
                        <Layout>
                          <InnerComponent {...props} />
                        </Layout>
                      );
                }
                else {
                    this.props.history.goBack();
                }
           
          }
          return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
        }}
      />
    );
  }

  isLoginSystem() {
    const token = localStorage.getItem('jwt');
    if (token) {
        return true;
    }

    return false;
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any,
};

export default withRouter(PrivateRoute);