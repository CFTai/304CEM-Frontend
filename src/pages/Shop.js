import React from 'react';
import axios from 'axios';

export default class Shop extends React.Component {
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
                this.setState({ products });
            })
    }

    render() {
        return (
            <div>
                <section >
                    <div className="centerElement">
                        <h2>Product</h2>

                    <div>
                        <ul>
                            {
                                this.state.products
                                    .map(product =>
                                        <li key={product.id}>{product.name} {product.size}</li>
                                    )
                            }
                        </ul>
                    </div>
                    </div>
                </section>
                <section>
                    <h2>Introduction</h2>
                </section>
                <section>
                    <h2>Shop list</h2>
                </section>
            </div>
        )
    }
}