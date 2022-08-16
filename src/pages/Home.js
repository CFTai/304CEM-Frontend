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


export default class Home extends Component  {
  constructor(props) {
    super(props);
  }

  state = {
    productList: []
  }

  componentDidMount() {
    axios.get('http://localhost:8080/product/')
      .then(res  => {
        this.setState({productList: res.data.data.result})
        console.log(this.state.productList)
      })
  }

  render() {
  return (
    <div>
      <Header
        brand="brand"
      />
      <section className={"custom-container"}>
        <div className={"landing-background"}>
        </div> 
        <div className={"landing-content"}>
          <h1><b>CLEARANCE SALE</b></h1>
          <p><b>
            ONCE THEY'RE GONE<br/>
            THEY'RE GONE!
          </b></p>
          <Link to={"/shop"}>
              <Button to="/shop" content="SHOP NOW" variant="defaultBtn"/>
          </Link>
        </div>
      </section>

      <section className={"custom-container"}>
        <div className={"product-background"}></div>
        <div className={"landing-content"}>
        <h2 className={"subtitle"}>GET OUT LATEST KIT</h2>
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <img class="group list-group-image" src="https://dummyimage.com/400x600/8873ff/ffffff" alt="Home Kit" />
              <div class="caption">
                    <h4 class="group inner list-group-item-heading">
                        HOME KIT</h4>
                    <Row>
                        <Col>
                            <p class="lead">
                                start from 49.99</p>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col>
              <img class="group list-group-image" src="https://dummyimage.com/400x600/8873ff/ffffff" alt="Third Kit" />
              <div class="caption">
                    <h4 class="group inner list-group-item-heading">
                        THIRD KIT</h4>
                    <Row>
                        <Col>
                            <p class="lead">
                                start from 49.99</p>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col>
              <img class="group list-group-image" src="https://dummyimage.com/400x600/8873ff/ffffff" alt="Home Kit" />
              <div class="caption">
                    <h4 class="group inner list-group-item-heading">
                        AWAY KIT</h4>
                    <Row>
                        <Col>
                            <p class="lead">
                                start from 49.99</p>
                        </Col>
                    </Row>
                </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <a class="btn btn-success" href="./product/?type=home">SHOP NOW</a>
            </Col>
          </Row>
        </Container>
        </div>
      </section>

      <section className={"custom-container"}>
        <h2>ABOUT ME</h2>
      </section>
      <Footer/>
    </div>
  )
  }
}