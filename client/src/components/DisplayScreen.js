import { Container, Row, Table } from 'react-bootstrap';

function DisplayScreen(props) {

    return (
        <>


            <Container style={{ borderRadius: 20, borderColor: 'blue', borderWidth: 2, borderStyle: 'double', marginTop: 100, padding: 50 }}>
            <Container className='center'>
                <div className="fw-bold" style={{ color: 'green', marginBottom: 20 }}>Calling board</div>
                </Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Counter</th>
                            <th>Ticket ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.displays.map((display) => <DisplayRow display={display} key={display.counterId} />)}

                    </tbody>
                </Table>
            </Container>


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