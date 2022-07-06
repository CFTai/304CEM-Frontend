import React from 'react';
import {getProductHandler} from '../service/product.js';

export default class HomePage extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    this.setState({products: getProductHandler()});
  }

  render() {
    return (
    <div>
      <p>This is a testing page</p>
      <ul>
        {
          this.state.products
            .map(product =>
              <li key={product.id}>{product.name} {product.size}</li>
            )
        }
      </ul>
    </div>
    )
  }
}