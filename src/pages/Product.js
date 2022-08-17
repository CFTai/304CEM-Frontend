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
import { ToggleButton } from 'react-bootstrap';


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

   addToCart() {
    console.log("Add to cart")
    console.log(this.state.selectedSize)
   }

   changeSelectedSize(v) {
    this.setState({selectedSize : v}, () => {
        this.updateSelectedProduct()
    })
   }

   changeSelectedType(v) {
    this.setState({selectedType : v}, () => {
        this.updateSelectedProduct()
    })
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
                                    <p className={"product_type"}>
                                        {this.state.selectedProduct.name} - {this.state.selectedProduct.size}
                                    </p>
                                    <p className={"product_description"}>
                                        {this.state.selectedProduct.description }
                                    </p>
                                    <p className={"product_stock"}>
                                        {this.state.selectedProduct.stock }
                                    </p>
                                    <p className={"product_price"}>
                                        {this.state.selectedProduct.price }
                                    </p>   
                                    <div>
                                        <ButtonGroup>
                                        {
                                            this.state.productList[this.state.selectedType].map((item, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`${this.state.selectedType}-${item.size}`}
                                                    type="radio"
                                                    variant='outline-success'
                                                    name="radio"
                                                    value={item.size}
                                                    checked={item.size === this.setState.selectedSize}
                                                    onChange={(e) => this.changeSelectedSize(e.currentTarget.value)}
                                                >
                                                    {item.size}
                                                </ToggleButton>
                                            ))
                                        }
                                        </ButtonGroup>
                                    </div>
                                    <div>
                                        <ButtonGroup>
                                        {
                                            Object.keys(this.state.productList).map((item, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`${item}`}
                                                    type="radio"
                                                    variant='outline-success'
                                                    name="radio"
                                                    value={item}
                                                    checked={this.setState.selectedType === item}
                                                    onChange={(e) => this.changeSelectedType(e.currentTarget.value)}
                                                >
                                                    {item}
                                                </ToggleButton>
                                            ))
                                        }
                                        </ButtonGroup>
                                    </div>
                                    <p>
                                        <button onClick={this.addToCart}>Add to cart</button>
                                    </p>
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