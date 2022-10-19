import { Row, Col, Container, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Statistics from './StatsComponents/Statistics';
import NewTicket from './NewTicket';
import MainBoard from './MainBoard';
import OfficerInterface from './OfficerInterface';
import ShowQueue from './ShowQueue';
import DisplayScreen from './DisplayScreen';


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
        <Container style={{ borderRadius: 20, borderColor: 'grey', borderWidth: 2, borderStyle: 'double', marginTop: 200, padding: 50 }}>
            <Container>
                <Row style={{ marginTop: 50, marginBottom: 50, marginLeft: 200, marginRight: 200 }}>
                    <Col>

                        <Link to="/getTicket"><Button variant="outline-primary" size='lg'>Get Ticket</Button></Link>
                    </Col>
                    <Col>
                        <Link to='/statistics'><Button variant="outline-secondary" size='lg'>Show statistics</Button></Link>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row style={{ marginTop: 50, marginBottom: 50, marginLeft: 200, marginRight: 200 }}>
                    <Col >
                        <Link to='/display'><Button variant="outline-success" size='lg'>Display screen</Button></Link>
                    </Col>
                    <Col>
                        <Link to='/nextCustomer'><Button variant="outline-warning" size='lg'>next Customer</Button></Link>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

function TicketRoute(props) {
    return (
        <Container fluid>

            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand >
                        TicketRoute
                    </Navbar.Brand>
                    <Link to="/"><Button variant='danger'>Back</Button></Link>

                </Container>
            </Navbar>
            <NewTicket />
        </Container>

    );
}

function DisplayRoute(props) {

    return (
        <Container fluid>
            <Row>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand >
                            Display Screen
                        </Navbar.Brand>
                        <Link to="/"><Button variant='danger'>Back</Button></Link>

                    </Container>
                </Navbar>
            </Row>
            <Row>
                <Container>
                    <MainBoard />
                </Container>
            </Row>


            <Container>
                <Row>
                    <Col>
                        <DisplayScreen displays={props.display} />
                    </Col>
                    <Col>
                        <ShowQueue services={props.services} />
                    </Col>
                </Row>
            </Container>

        </Container>


    );
}

function NextRoute(props) {
    return (
        <Container fluid>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand >
                        Next Customer
                    </Navbar.Brand>
                    <Link to="/"><Button variant='danger'>Back</Button></Link>

                </Container>
            </Navbar>
            <OfficerInterface displays={props.display}/>
        </Container>

    );
}

function StatisticsRoute(props) {
    return (
        <>
            <Container fluid>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand >
                            StatisticsRoute
                        </Navbar.Brand>
                        <Link to="/"><Button variant='danger'>Back</Button></Link>
                    </Container>
                </Navbar>
            </Container>
            <Container fluid>
                <Statistics />
            </Container>
        </>
    );
}

export { DefaultRoute, AppLayout, TicketRoute, StatisticsRoute, NextRoute, DisplayRoute };
