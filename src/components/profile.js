
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../components/loading';
import Button from 'react-bootstrap/Button';


function ProfileComponent(props) {
    const result = props.list
    var newPassword = '';

    const updatePassword = () => {
        console.log(props)
        props.updatePw(newPassword)
    }

    return (
            result ? (
                <Container>
                    <Row>
                        <Col><h3>Personal Information</h3></Col>
                    </Row>
                    <Row>
                        <Col><p>Email address</p></Col>
                        <Col><p>{result.email || '-'}</p></Col>
                    </Row>
                    <Row>
                        <Col><p>Points</p></Col>
                        <Col><p>{result.point}</p></Col>
                    </Row>
                    <Row>
                        <Col><h3>Update password</h3><br/>
          <div className="form-group mt-1">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter new password"
              onChange={e => newPassword = e.target.value}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button
                variant="primary"
                onClick={()=>updatePassword()}
            >
                Update
            </Button>
          </div>
          </Col> 
        </Row>
                </Container>) : (
                        <Loading />)
        )
    
}

export default ProfileComponent;