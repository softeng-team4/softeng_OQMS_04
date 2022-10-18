import { Container, Table } from 'react-bootstrap';

function DisplayScreen(props) {
    console.log(props.display)
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
                        {props.displays.map((display) => <DisplayRow display={display}/>)}

                    </tbody>
                </Table>
            </Container>
        </>
    );
}

function DisplayRow(props){
    return(
        
        <tr>
        <th>{props.display.counterId}</th>
        <th>{props.display.ticketId}</th>
        </tr>
        
    );
}

export default DisplayScreen;