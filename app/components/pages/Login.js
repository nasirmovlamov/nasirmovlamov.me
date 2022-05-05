import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '@store/billy-store/action';
import { config } from '@store/billy-store/config';
import { Button, Form, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import toast from 'toasted-notes';
import logo from '../../assets/img/logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isShowPassword: false,
    };
  };

  handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    this.setState({ loading: true });

    axios.post(config.apiURL + 'api/v1/auth/login', data)
      .then(res => {
        // console.log('res', res.data);
        if (res.data.status) {

          console.log('login res', res.data);

          localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('permissions', JSON.stringify(res.data.user.permissions.map(p => p.name)));

          let userData = {
            fullname: `${res.data.user.name ? res.data.user.name : ''} ${res.data.user.surname ? res.data.user.surname : ''}`,
            roles: res.data.user.roles,
            permissions: res.data.user.permissions.map(p => p.name),
          };

          this.props.login(userData);
        }
      }).catch(error => {
        this.setState({ loading: false });
        toast.notify(({ onClose }) => (
          <div className="alert alert-danger m-3">
            <h5>Uğursuz əməliyyat!</h5>
            <p className="mb-0">İstifadəçi adı və ya şifrə səhvdir!</p>
          </div>), { position: "top-right", duration: 2500 }
        );
      });
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-5">
              <div className="login-wrapper p-4 p-md-5">
                <div className="form-logo">
                  <img src={logo} alt="logo" />
                </div>
                <h4 className="text-center text-warning">Xoş Gəlmisiniz</h4>
                <p className="text-center mb-4">Zəhmət olmasa email və şifrənizi düzgün daxil edin.</p>
                <Form onSubmit={(e) => this.handleLogin(e)}>
                  <div className="form-group">
                    <Label for="email" className="font-weight-bold">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email daxil edin"
                    />
                  </div>
                  <div className="form-group position-relative">
                    <Label for="password" className="font-weight-bold">Şifrə</Label>
                    <Input
                      id="password"
                      name="password"
                      type={this.state.isShowPassword ? "text" : "password"}
                      placeholder="Şifrə daxil edin"
                      onChange={(e) => {
                        this.setState({ newPasswordValue: e.target.value })
                      }}
                    />
                    <FontAwesomeIcon
                      icon={this.state.isShowPassword ? faEye : faEyeSlash}
                      className="eye-icon"
                      onClick={() => {
                        this.setState({
                          isShowPassword: !this.state.isShowPassword
                        })
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Button
                      color="warning"
                      className="font-weight-bold mt-4"
                      block
                    >
                      Daxil ol
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (role) => dispatch(login(role))
  }
}

export default connect(null, mapDispatchToProps)(Login);
