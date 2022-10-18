import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';

function NewTicket(props) {
    const [service, setService] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // call the API and visualize the ticket
        }
        setValidated(true);
    };

    return <Container className="new_ticket_container" style={{ borderRadius: 20, borderColor: 'grey', borderWidth: 2, borderStyle: 'double', padding: 20 }}>
        <h2 align="center">Get a ticket</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Select aria-label="Service selection form" required onChange={(e) => setService(e.target.value)}>
                <option>Select a service</option>
                <option value="1">Service 1</option>
                <option value="2">Service 2</option>
                <option value="3">Service 3</option>
            </Form.Select>
            <div align='right' style={{ marginTop: 10 }}>
                <Button type='submit' variant='outline-success'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check-circle"
                        viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg> Confirm
                </Button>
            </div> 
        </Form>
    </Container>
}

export default NewTicket;