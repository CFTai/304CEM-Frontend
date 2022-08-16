import React, {Component} from 'react';
import Loading from '../components/loading';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';


export default class Product extends Component  {
  constructor(props) {
    super(props);
    this.state = {
        productList: null,
        selectedSize: 'S',
        selectedType: 'Home kit',
        selectedQuantity: 0,
        selectedProduct: null,
        loading: true,
      }
  }

  componentDidMount() {
    if (!this.state.productList) {
        (async () => {
            try {
                this.setState({productList: await this.queryProduct()}, () => {
                    this.updateSelectedProduct();
                    this.setState({loading:false})
                    console.log(this.state.productList)
                })
            } catch (e) {
                console.log(e)
            }
        })()
    }
  }

  async queryProduct() {
    const res = await axios.get('http://localhost:8080/product/')
    const data = await res.data.data.result;
    const group_list = await data.reduce(function (r, a) {
                r[a.name] = r[a.name] || [];
                r[a.name].push(a);
                return r;
            }, Object.create(null));
    return await group_list
  }

  updateSelectedProduct() {
    try {
        const result = this.state.productList[this.state.selectedType].find(item => item.size === this.state.selectedSize)
        this.setState({selectedProduct : result})
    } catch (e) {
        console.log(e)
    }
  }

  render() {
    const handleSizeClick = (e) => {
        console.log(e.target.value);
    }
  return (
    <div>
        <Header/>
            <section className={"custom-container grid product"}>
                {
                    this.state.loading === false ? (
                        <Container>
                            <Row>
                                <Col>
                                    <img className="group list-group-image" src="https://dummyimage.com/400x600/8873ff/ffffff" alt="Home Kit" />
                                </Col>
                                <Col>
                                    <h1><b>Football Kit</b></h1>
                                    <p className={"product_description"}>
                                        {this.state.selectedProduct.description }
                                    </p>
                                    <p className={"product_stock"}>
                                        {this.state.selectedProduct.stock }
                                    </p>
                                    <p className={"product_price"}>
                                        {this.state.selectedProduct.price }
                                    </p>   
                                    <ButtonGroup onClick={handleSizeClick}>
                                        <Button variant="primary" value="Button 1">Button 1</Button>
                                        <Button variant="danger" value="Button 2"> Button 2</Button>
                                        <Button variant="warning" value="Button 3">Button 3</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Container>
                    ) : (
                        <Loading />
                    )
                }
            </section>
        <Footer/>
    </div>
  )
  }
}