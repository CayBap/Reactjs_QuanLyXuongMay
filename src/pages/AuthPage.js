import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Card, Col, Row } from 'reactstrap';
import { featchLogin, featchSignUp } from '../services/apis/authService';
import { actLoginSuccess } from '../actions/authAct';

class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };
    handleLoginOrSignUp = (type, body) => {
        if (type === "LOGIN") {
            featchLogin(body.phone, body.password).then((result) => {
                if (result.status === 200) {
                    this.props.onLoginSuccess(result.data);
                    this.props.history.push('/home');
                }
            }).catch((err) => {

            });
        } else {
            featchSignUp();
        }
    }
    render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={3}>
          <Card body>
            <AuthForm
                authState={this.props.authState}
                onChangeAuthState={this.handleAuthState}
                onLogoClick={this.handleLogoClick}
                OnLoginOrSignUp = {this.handleLoginOrSignUp}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        user:state.user
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoginSuccess: data => {
            dispatch(actLoginSuccess(data));
        },
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
  )(AuthPage);