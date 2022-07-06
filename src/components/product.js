import React from 'react';
import axios from 'axios';

export default class product extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/product/`)
      .then(res => {
        // const persons = res.data;
        // this.setState({ persons });
        const products = res.data.data.result;
        console.log(products);
        this.setState({products});
      })
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