import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class AuthForm extends React.Component {
    state = {
        phone: '',
        password: '',
        rePassword: '',
        firstName: '',
        lastName: '',
    }
    get isLogin() {
        return this.props.authState === STATE_LOGIN;
    }

    get isSignup() {
        return this.props.authState === STATE_SIGNUP;
    }

    changeAuthState = authState => event => {
        event.preventDefault();

        this.props.onChangeAuthState(authState);
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.isLogin) {
            const { phone, password } = this.state;
            this.props.OnLoginOrSignUp('LOGIN',{phone,password});
        }

    };
    onChangeInput = event => {
        this.setState({ [event.target.name]: event.target.value });
        
    }
    renderButtonText() {
        const { buttonText } = this.props;

        if (!buttonText && this.isLogin) {
            return 'Đăng nhập';
        }

        if (!buttonText && this.isSignup) {
            return 'Đăng kí';
        }
        return buttonText;
    }

    render() {
        const {
            showLogo,
            usernameLabel,
            usernameInputProps,
            passwordLabel,
            passwordInputProps,
            confirmPasswordLabel,
            confirmPasswordInputProps,
            firstNameLabel,
            firstNameInputProps,
            lastNameLabel,
            lastNameInputProps,
            children,
            onLogoClick,
        } = this.props;

        const { phone, firstName, lastName, password, rePassword } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                {showLogo && (
                    <div className="text-center pb-4">
                        <img
                            src={logo200Image}
                            className="rounded"
                            style={{ width: 60, height: 60, cursor: 'pointer' }}
                            alt="logo"
                            onClick={onLogoClick}
                        />
                    </div>
                )}
                <FormGroup>
                    <Label for={usernameLabel}>{usernameLabel}</Label>
                    <Input {...usernameInputProps} value={phone} onChange = {this.onChangeInput} name = "phone"/>
                </FormGroup>

                <FormGroup>
                    <Label for={passwordLabel}>{passwordLabel}</Label>
                    <Input {...passwordInputProps} value={password} onChange = {this.onChangeInput} name = "password" />
                </FormGroup>
                {this.isSignup && (
                    <div> <FormGroup>
                        <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
                        <Input {...confirmPasswordInputProps} value={rePassword}  onChange = {this.onChangeInput} name = 'rePassword' />
                    </FormGroup>
                        <FormGroup>
                            <Label for={firstNameLabel}>{firstNameLabel}</Label>
                            <Input {...firstNameInputProps} value={firstName} onChange = {this.onChangeInput} name = "firstName" />
                        </FormGroup>
                        <FormGroup>
                            <Label for={lastNameLabel}>{lastNameLabel}</Label>
                            <Input {...lastNameInputProps} value={lastName} onChange = {this.onChangeInput} name ="lastName" />
                        </FormGroup></div>
                )}
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" />{' '}
                        {this.isSignup ? 'Đồng ý các điều khoản và chính sách' : 'Nhớ mật khẩu'}
                    </Label>
                </FormGroup>
                <hr />
                <Button
                    size="lg"
                    //   className="bg-gradient-theme-left border-0"
                    color="primary"
                    block
                    onClick={this.handleSubmit}>
                    {this.renderButtonText()}
                </Button>

                <div className="text-center pt-1">
                    <h6>hoặc</h6>
                    <h6>
                        {this.isSignup ? (
                            <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                                Đăng nhập
                            </a>
                        ) : (
                                <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                                    Đăng kí
                                </a>
                            )}
                    </h6>
                </div>

                {children}
            </Form>
        );
    }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
    authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
    showLogo: PropTypes.bool,
    usernameLabel: PropTypes.string,
    usernameInputProps: PropTypes.object,
    firstNameLabel: PropTypes.string,
    firstNameInputProps: PropTypes.object,
    lastNameLabel: PropTypes.string,
    lastNameInputProps: PropTypes.object,
    passwordLabel: PropTypes.string,
    passwordInputProps: PropTypes.object,
    confirmPasswordLabel: PropTypes.string,
    confirmPasswordInputProps: PropTypes.object,
    onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
    authState: 'LOGIN',
    showLogo: true,
    usernameLabel: 'Số điện thoại',
    usernameInputProps: {
        type: 'text',
        placeholder: '0359943355',
    },
    passwordLabel: 'Mật khẩu',
    passwordInputProps: {
        type: 'password',
        placeholder: 'mật khẩu của bạn',
    },
    firstNameLabel: 'Tên',
    firstNameInputProps: {
        type: 'string',
        placeholder: 'Tên',
    },
    lastNameLabel: 'Họ',
    lastNameInputProps: {
        type: 'string',
        placeholder: 'Họ',
    },
    confirmPasswordLabel: 'Nhập lại mật khẩu',
    confirmPasswordInputProps: {
        type: 'password',
        placeholder: 'Nhập lại mật khẩu của bạn',
    },
    onLogoClick: () => { },
};

export default AuthForm;
