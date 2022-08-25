import axios from 'axios';

export function getProductHandler() {
    axios.get(`http://localhost:8080/product/`)
      .then(res => {
        // const persons = res.data;
        // this.setState({ persons });
        const products = res.data.data.result;
        return products;
      })
}
