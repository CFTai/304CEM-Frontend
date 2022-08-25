import Table from 'react-bootstrap/Table'
import moment from 'moment';

function OrderHistoryComponent(props) {
    const result = props.list
    return (
        <div>
        {
        result ? ( 
            <Table>
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Created At</th>
          <th>DeliverDate</th>
          <th>Deliver Fee</th>
          <th>Total Fee</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
            result.map((item, i) => 
            <tr>
                <th>{item._id}</th>
                <th>{moment(item.createdAt).format('YYYY-MM-DD hh:MM:ss')}</th>
                <th>{moment(item.deliverDate).format('YYYY-MM-DD hh:MM:ss')}</th>
                <th>{item.deliverFee}</th>
                <th>{item.totalPrice}</th>
                <th>{item.status}</th>
            </tr>
            )
        }
      </tbody>
    </Table>
        ) : (<p>no</p>)}
        </div>
    )
}

export default OrderHistoryComponent;