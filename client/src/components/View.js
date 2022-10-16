import { Row, Col, Container } from 'react-bootstrap';
import "../App.css";

function DefaultRoute() {
    return (
        <>
            <Row>
                <Col>
                    <h1>Nothing here...</h1>
                    <p>This is not the route you are looking for!</p>
                </Col>
            </Row>
        </>
    );
}

function AppLayout(props) {
    return (
        <Container fluid>
            <Row>

                <Col>
                    {/* main page show here*/}
                    <Outlet />
                </Col>

            </Row>

        </Container>
    );
}

export { DefaultRoute, AppLayout };
