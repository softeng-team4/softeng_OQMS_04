import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import DeskBoard from "./DeskBoard";
import ListGroup from 'react-bootstrap/ListGroup';

function MainBoard(props) {
    const [deskList, setDeskList] = useState([1, 2, 3, 4, 5]);

    return <Container className="center" style={{ padding: 20}}>
        <ListGroup horizontal>
            { deskList.map(desk => 
                <ListGroup.Item key={desk}>
                    <DeskBoard desk={desk} />
                </ListGroup.Item>)
            }
        </ListGroup>
    </Container>
}

export default MainBoard;