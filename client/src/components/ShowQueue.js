import { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import API from '../API';

function ShowQueue(props) {

    return (
        <>
            <Row>
                <Container >
                    <div className="fw-bold" style={{ color: 'red' }}>Waiting Line</div>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Waiting People</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.services.map((service) => <ServiceRow service={service} key={service.id} />)}
                        </tbody>
                    </Table>
                </Container>
            </Row>

        </>
    );
}

function ServiceRow(props) {
    const [queues, setQueues] = useState([]);
    const [queueLength, setQueueLength] = useState('');

    useEffect(() => {
        getQueues(props.service.id);
        getQueueLength(props.service.id);
    }, [queues.length]);

    const getQueues = async (serviceId) => {
        const list = await API.getQueues(serviceId);
        //get queues info from api
        setQueues(list);
    };

    const getQueueLength = async (serviceId) => {
        const list = await API.getQueueLength(serviceId);
        //get queues info from api
        setQueueLength(list);
    };

    return (
        <>


            <tr>
                <th>{props.service.name}</th>
                <th>{queues === '' ? 0 : queueLength}</th>
        
            </tr>


        </>

    );
}

export default ShowQueue;
