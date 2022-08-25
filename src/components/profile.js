
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../components/loading';


function ProfileComponent(props) {
    const result = props.list
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
                </Container>) : (
                        <Loading />)
        )
    
}

export default ProfileComponent;