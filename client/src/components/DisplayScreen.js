import { Container, Table } from 'react-bootstrap';

function DisplayScreen(props) {

    return (
        <>
            <Container >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Counter</th>
                            <th>Ticket ID</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default DisplayScreen;