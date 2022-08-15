import React, {Component} from 'react';
import Overlay from '../components/overlay';
import Header from '../components/header';
import Button from '../components/button';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
      <section className={"container"}>
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

      <section className={"container"}>
        <h2 className={"underline"}>GET OUT LATEST KIT</h2>
      </section>

      <section className={"container"}>
        <h2>ABOUT ME</h2>
      </section>
      <Footer/>
    </div>
  )
  }
}