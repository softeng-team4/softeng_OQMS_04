import { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import API from '../API';

function ShowQueue(props) {

    return (
        <>
            <Row>
                <Container >
                    <div className="fw-bold" style={{ color: 'red' }}>Waiting Line</div>
                    <Table striped  hover>
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Waiting Queue</th>
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

    useEffect(() => {
        getQueues(props.service.id)
    }, []);

    const getQueues = async (serviceId) => {
        const list = await API.getQueues(serviceId);
        //get queues info from api
        setQueues(list);
    };

    return (
        <>


            <tr>
                <th>{props.service.name}</th>

                {queues === '' ? '' : queues.map((queue, i) => <QueueRow queue={queue} key={i} />)}

            </tr>


        </>

    );
}

function QueueRow(props) {
    return (


        <th>{props.queue.id}</th>

    );
}

export default ShowQueue;
