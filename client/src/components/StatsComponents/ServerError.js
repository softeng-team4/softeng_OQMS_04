import { BiError } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const ServerError = (props) => {

    return (
        <>  
            <Container fluid>
                <Row>
                    <Col />
                    <Col sm={6}>
                        <Row className='d-flex justify-content-center align-items-center'><BiError className='blinking' size={200} /></Row>
                        <Row >
                            <h3 className='d-flex justify-content-center align-items-center'>
                                {props.serverError}&nbsp;
                                <Link to='/'>Reload</Link>
                            </h3>
                        </Row>
                    </Col>
                    <Col />
                </Row>
            </Container>
        </>
    );
};

export default ServerError;