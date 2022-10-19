import { Row, Col, Container, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Statistics from './StatsComponents/Statistics';
import NewTicket from './NewTicket';
import MainBoard from './MainBoard';
import OfficerInterface from './OfficerInterface';
import ShowQueue from './ShowQueue';


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
        <Container>
            <Row>
                <Link to="/getTicket"><Button variant="outline-primary">Get Ticket</Button></Link>

                <Link to='/statistics'><Button variant="outline-secondary">Show statistics</Button></Link>
            </Row>
            <Row>
                <Link to='/display'><Button variant="outline-success">Display screen</Button></Link>

                <Link to='/nextCustomer'><Button variant="outline-warning">next Customer</Button></Link>

            </Row>
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

            <MainBoard />
            <Row>
                <ShowQueue queues={props.queues} services={props.services}/>
            </Row>
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
            <OfficerInterface/>
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
                <Statistics/>
            </Container>
        </>
    );
}

export { DefaultRoute, AppLayout, TicketRoute, StatisticsRoute, NextRoute, DisplayRoute };
