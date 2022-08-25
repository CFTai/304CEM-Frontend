import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";
import axios from 'axios';

export default class Login extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loading: false,
      redirect: false,
    }
  }

  componentDidMount() {
  }

  async LoginUser(credentials) {
    return fetch( process.env.REACT_APP_API_URL + 'auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  }

  async getUserProfile(token) {
    const configuration = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "user/profile/",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const req = await axios(configuration);
    const res = await req.data.data.name
    return res
  }

  render() {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await this.LoginUser({
        "email": this.state.email,
        "password": this.state.password
      })
      if (result.success) {
        // setToken(result.data.token)
        const cookies = new Cookies();
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        })
        const userProfile = await this.getUserProfile(result.data.token)
        cookies.set("USERNAME", userProfile, {
          path: "/",
        })
        this.setState({redirect : true})
      } else {
        console.log("Login error")
      }
    }

    if(this.state.redirect) {
      return <Navigate to="/" replace={true} />
    }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
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
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={e => this.setState({password: e.target.value})}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
  }
}