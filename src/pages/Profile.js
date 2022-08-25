import React, {Component} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';

import { Tab } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import OrderHistoryComponent from '../components/orderPage';
import CartComponent from '../components/cart';
import ProfileComponent from '../components/profile';
import Cookies from 'universal-cookie';

export default class Profile extends Component  {
  constructor(props) {
    super(props);
    this.state = {
        dataList: {
        userProfile: null,
        orderHistory: null,
        cartList: null,
        },
        tabKey: 'profile',
      }
  }

  componentDidMount() {
    (async () => {
        await this.queryProfile()
        await this.queryOrderHistory()
        await this.queryCart()
    })()
  }

  async queryProfile() {
    const configuration = {
        method: "get",
        url: process.env.REACT_APP_API_URL + "user/profile/",
        headers: {
            Authorization: `Bearer ${this.getToken()}`,
        },
    }
    axios(configuration)
    .then((result) => {
        if(result.data.success) {
          this.setState(prevState => {
              let dataList = {...prevState.dataList};
              dataList.userProfile = result.data.data;
              return {dataList}
          }, () => {
          });
        }
    })
    .catch((error) => {
      error = new Error();
    });
  }

  async queryOrderHistory() {
    const configuration = {
        method: "get",
        url: process.env.REACT_APP_API_URL + "order/",
        headers: {
            Authorization: `Bearer ${this.getToken()}`,
        },
    }
    axios(configuration)
    .then((result) => {
      if(result.status === 200) {
        this.setState(prevState => {
            let dataList = {...prevState.dataList};
            dataList.orderHistory = result.data.data.result;
            return {dataList}
        }, () => {
        });
      }
    })
    .catch((error) => {
      error = new Error();
    });
  }

  async queryCart() {
    const configuration = {
        method: "get",
        url: process.env.REACT_APP_API_URL + "order/cart/",
        headers: {
            Authorization: `Bearer ${this.getToken()}`,
        },
    }
    axios(configuration)
    .then((result) => {
        if(result.status === 200) {
          this.setState(prevState => {
              let dataList = {...prevState.dataList};
              dataList.cartList = result.data.data.result;
              return {dataList}
          }, () => {
          });
        }
    })
    .catch((error) => {
      error = new Error();
    });

  }

  async callPlaceOrder() {
    const configuration = {
        method: "post",
        url: process.env.REACT_APP_API_URL + "order/cart",
        headers: {
            Authorization: `Bearer ${this.getToken()}`,
        },
    }
    axios(configuration)
    .then((result) => {
      if(result.status === 201) {
        this.queryCart()
        this.queryOrderHistory()
      }
    })
    .catch((error) => {
      error = new Error();
    });
  }

  async clearCart() {
    const configuration = {
        method: "delete",
        url: process.env.REACT_APP_API_URL + "order/cart",
        headers: {
            Authorization: `Bearer ${this.getToken()}`,
        },
    }
    axios(configuration)
    .then((result) => {
      if(result.status === 200) {
        this.queryCart()
        this.queryOrderHistory()
      }
    })
    .catch((error) => {
      error = new Error();
    });
  }

  getToken() {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    return token;
  }

  onCartItemDelete(id) {
    const configuration = {
        method: "delete",
        url: process.env.REACT_APP_API_URL + "order/cart/" + id + "/item/",
        headers: {
            Authorization: `Bearer ${this.getToken()}`,
        },
    }
    axios(configuration)
    .then((result) => {
      if(result.status === 200) {
        this.queryCart()
        this.queryOrderHistory()
      }
    })
    .catch((error) => {
      error = new Error();
    });
  }


  render() {

    const handlePlaceOrder = () => {
        this.callPlaceOrder();
    }

    const clearCart = () => {
        this.clearCart();
    }

    const removeItemFromCart = (id) => {
        this.onCartItemDelete(id);
    }

  return (
    <div>
        <Header/>
        <section className={"custom-container block product"}>
            <Container>
                <Row>
                    <Col>
                        <h2>Welcome</h2>
                    </Col>
                </Row>
                <Row>
                <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders">Orders History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="cart">Cart</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="profile">
              <ProfileComponent list={this.state.dataList.userProfile}/>
            </Tab.Pane>
            <Tab.Pane eventKey="orders">
              <OrderHistoryComponent list={this.state.dataList.orderHistory}/>
            </Tab.Pane>
            <Tab.Pane eventKey="cart">
              <CartComponent list={this.state.dataList.cartList} onCartItemDelete={removeItemFromCart} placeOrder={handlePlaceOrder} clearCart={clearCart}/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
                    </Row> 
            </Container>
        </section>
        {/* <Footer/> */}
    </div>
  )
  }
}