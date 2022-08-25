import React, {Component} from 'react';
import { Navigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';

import ToastContainer from 'react-bootstrap/ToastContainer';

export default class SignUp extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      username: null,
      confirm_password: null,
      password: null,
      loading: false,
      showToast: false,
      toastMessage: null
    }
  }

  componentDidMount() {
  }

  async LoginUser(credentials) {
    return fetch(process.env.REACT_APP_API_URL + 'auth/signup/', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => {
        if (data.status === 200) {
            this.setState({redirect : true})
        } else {
            this.setState({showToast: true, toastMessage: 'server unavailable error. Please try later', loading: false})
            return;
        }
      })
  }

  render() {
    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            this.setState({loading: true})
            if (!this.state.username || this.state.username.trim() === '') {
                this.setState({showToast: true, toastMessage: 'Username cannot be none', loading: false})
                return;
            }
            if (!this.state.email || this.state.email.trim() === '') {
                this.setState({showToast: true, toastMessage: 'Email cannot be none', loading: false})
                return;
            }
            if (!this.state.password) {
                this.setState({showToast: true, toastMessage: 'Password cannot be none', loading: false})
                return;
            }
            if (this.state.password !== this.state.confirm_password) {
                this.setState({showToast: true, toastMessage: 'Two passwords are not the same', loading: false})
                return;
            }
            this.LoginUser({
                "email": this.state.email,
                "password": this.state.password,
                "username": this.state.username,
            })
        } catch (e) {
            throw e
        }
    }

    if(this.state.redirect) {
      return <Navigate to="/signupSuccess" replace={true} />
    }

  return (
    <div>
        <div
            className='toastSection'
            aria-live="polite"
            aria-atomic="true"
        >
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => this.setState({showToast: false, toastMessage: null})} show={this.state.showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Reminder</strong>
                    </Toast.Header>
                    <Toast.Body>{this.state.toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign up</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={e => this.setState({email: e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={e => this.setState({username: e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={e => this.setState({password: e.target.value})}
            />
          </div>

          <div className="form-group mt-3">
            <label>Confirm password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password again"
              onChange={e => this.setState({confirm_password: e.target.value})}
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={this.state.loading}>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
  )
  }
}