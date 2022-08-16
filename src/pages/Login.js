import React, {Component} from 'react';
import Overlay from '../components/overlay';
import Header from '../components/header';
import Button from '../components/button';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class Login extends Component  {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  }

  render() {
  return (
    <div>
        <div class="login-box ">
            <h2>MEMBER LOGIN</h2>
            <form>
                <div class="user-box">
                    <input type="text" name="" required="" />
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required="" />
                    <label>Password</label>
                </div>
                <a href="#">
                    Submit
                </a>
            </form>
        </div>
    </div>
  )
  }
}