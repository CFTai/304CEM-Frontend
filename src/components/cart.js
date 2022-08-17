import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

function CartComponent(props) {
    const result = props.list
    var isLoading = false;

    const deleteItem = (id) => {
        props.onCartItemDelete(id)
    }

    const deleteAll = () => {
        props.clearCart()
    }

    const placeOrder = () => {
        props.placeOrder()
    }

    return (
        <div>
        {
        result && result.length > 0 ? ( 
            <div>
            <Table striped>
      <thead>
        <tr>
          <th>Detail</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            result.map((item, i) => 
            <tr>
                <th>
                    <div>
                        <h3>{item.productName}</h3>
                        <p>Size: {item.productSize}</p>
                        <span>
                            Print name: {item.printName || '-'} <br/>
                            Print number: {item.printNumber || '-'}
                        </span>
                    </div>
                </th>
                <th>{item.originPrice}</th>
                <th>{item.quantity}</th>
                <th>
                    <Button
                        variant="primary"
                        onClick={()=>deleteItem(item._id)}
                    >
                        {isLoading  ? 'Loading' : 'Delete'}
                    </Button>
                </th>
            </tr>
            )
        }
      </tbody>
    </Table>

    <Button
                        variant="primary"
                        onClick={()=>placeOrder()}
                    >
                        Place order
    </Button>
    <Button
                        variant="primary"
                        onClick={()=>deleteAll()}
                    >
                        Clear Cart
    </Button>
    </div>
        ) : (<p>Your cart is empty</p>)}
        </div>
    )
}

export default CartComponent;