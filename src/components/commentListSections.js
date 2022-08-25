import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function CommentListSection(props) {
    const result = props.list
    var isLoading = false;

    const deleteItem = (id) => {
        props.onCartItemDelete(id)
    }

    return (
        <div className={'CommentListSection'}>
            <h3>Comments</h3> 
        {
        result && result.length > 0 ? ( 
            <ListGroup>
                {
                    result.map((item, i) => 
                        <ListGroup.Item className={'CommentListItem'}>
                            <p>
                                <span className='commentatorTitle'>User {item.user}:</span>
                                <span className='commentatorContent'>{item.content}</span>
                                <hr></hr>
                            </p>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
            ) : (<p>Your cart is empty</p>)}
        </div>
    )
}

export default CommentListSection;