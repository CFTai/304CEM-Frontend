import React, {Component} from 'react';
import Loading from '../components/loading';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CommentSection from '../components/commentSection';
import { ToggleButton } from 'react-bootstrap';
import Cookies from "universal-cookie";

export default class Product extends Component  {
  constructor(props) {
    super(props);
    this.state = {
        productList: null,
        selectedSize: 'S',
        selectedType: 'Home kit',
        selectedProduct: null,
        loading: true,
        form : {
            printName: null,
            printNumber: null,
            quantity: 1,
        }
      }
  }

  componentDidMount() {
    if (!this.state.productList) {
        (async () => {
            try {
                this.setState({productList: await this.queryProduct()}, () => {
                    this.updateSelectedProduct();
                    this.setState({loading: false})
                })
            } catch (e) {
                console.log(e)
            }
        })()
    }
  }

  async queryProduct() {
    const res = await axios.get(process.env.REACT_APP_API_URL + 'product/').catch(
        function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    )
    const data = await res.data.data.result; 
    const group_list = await data.reduce(function (r,a) {
                r[a.name] = r[a.name] || [];
                r[a.name].push(a);
                return r;
            }, Object.create(null));
    return await group_list
  }

  async addToCart(){
    // pack form item to json
    const body = this.state.form
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const configuration = {
        method: "post",
        url: process.env.REACT_APP_API_URL + 'product/' + this.state.selectedProduct._id + '/cart/',
        data: body,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    // call post api
    axios(configuration)
      .then((result) => {
        if(result.status === 201) {
            console.log('Popup message');
        }
      })
      .catch((error) => {
        error = new Error();
      });
  }

  updateSelectedProduct() {
    try {
        const result = this.state.productList[this.state.selectedType].find(item => item.size === this.state.selectedSize)
        this.setState({selectedProduct : result})
    } catch (e) {
        console.log(e)
    }
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
    const handleAddToCart = (e) => {
        e.preventDefault();
        this.addToCart();
     }

    const toggleFavourite = () => {
        const cookies = new Cookies();
        const token = cookies.get("TOKEN");
        const configuration = {
            method: "put",
            url: process.env.REACT_APP_API_URL + 'product/' + this.state.selectedProduct._id + '/favourite/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        axios(configuration)
        .then((result) => {
        if(result.status === 200) {
            console.log('Popup message');
        }
        })
        .catch((error) => {
            error = new Error();
        });
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
                                        <br/>
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
                                    <form onSubmit={handleAddToCart}>
                                        <label>
                                            Perosnal name
                                        </label>
                                        <br/>
                                        <input
                                            type="text"
                                            name="printName"
                                            onChange={e => this.setState({form : {...this.state.form, printName :e.target.value}})}
                                        />
                                        <br/>
                                        <label>
                                            Perosnal Number
                                        </label>
                                        <br/>
                                        <input
                                            type="text"
                                            name="printNumber"
                                            onChange={e => this.setState({form :{...this.state.form, printNumber :e.target.value}})}
                                        />
                                        <br/>
                                        <label>
                                            Quantity
                                        </label>
                                        <br/>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={this.state.form.quantity}
                                            onChange={e => this.setState({form :{...this.state.form, quantity :e.target.value}})}
                                        />
                                        <br/>
                                        <br/>
                                        <input type="submit" className="submitButton" />
                                    </form>
                                        <br/>
                                        <Button
                                            variant="primary"
                                            onClick={toggleFavourite}
                                        >
                                            Add To Favourite
                                        </Button>
                                </Col>
                            </Row>

                            <Row>
                                <CommentSection />
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