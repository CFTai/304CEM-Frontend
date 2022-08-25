import React, {Component} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class SignupSuccess extends Component  {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

  return (<div>
    <Header/>
        <section className={"custom-container grid product"}>
                    <Container>
                        <Row>
                            <Col>
                                <p>Sign up success. Please login</p>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <a className="btn btn-success" href="./login">Go to login</a>
                            </Col>
                        </Row>
                    </Container>
        </section>
    <Footer/>
</div>
  )
  }
}