import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function OfficerInterface(props) {
    const [counterList, setCounterList] = useState([1, 2, 3]);

    return <Container style={{ borderRadius: 20, borderColor: 'grey', borderWidth: 2, borderStyle: 'double', marginTop: 20, padding: 20 }}>
        <Tabs
            id="counter-tab"
            className="mb-3">
            { counterList.map(counter =>
                <Tab key={counter} eventKey={counter} title={ "Counter " + counter }>
                    <h5 align='center' style={{ padding: 20 }}>Serving customer <i><b>T1</b></i></h5>
                    <div align='right'>
                        <Button variant="outline-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-arrow-right-circle"
                                viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg> Next Customer
                        </Button>
                    </div>
                </Tab>)
            }
        </Tabs>
    </Container>
}

export default OfficerInterface;