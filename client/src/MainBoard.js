import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import DeskBoard from "./DeskBoard";
import ListGroup from 'react-bootstrap/ListGroup';

function MainBoard(props) {
    const [deskList, setDeskList] = useState([1, 2, 3, 4]);

    return <Container>
        <ListGroup horizontal variant='flush'>
            { deskList.map(desk => 
                <ListGroup.Item>
                    <DeskBoard key={desk} desk={desk} />
                </ListGroup.Item>)
            }
        </ListGroup>
    </Container>
}

export default MainBoard;