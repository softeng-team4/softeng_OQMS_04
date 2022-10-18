import { Container, Row, Table } from 'react-bootstrap';

function DisplayScreen(props) {

    return (
        <>
            <Row>
                <Container >
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Counter</th>
                                <th>Ticket ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.displays.map((display) => <DisplayRow display={display} key={display.counterId}/>)}

                        </tbody>
                    </Table>
                </Container>
            </Row>
            
        </>
    );
}

function DisplayRow(props) {
    return (

        <tr>
            <th>{props.display.counterId}</th>
            <th>{props.display.ticketId}</th>
        </tr>

    );
}


export default DisplayScreen;