import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import DeskBoard from "./DeskBoard";
import ListGroup from 'react-bootstrap/ListGroup';
import API from "../API";

function MainBoard(props) {
    const [deskList, setDeskList] = useState([]);
    const [previousList, setPreviousList] = useState([]);
    let prevList = [];

    useEffect(() => {
        refreshList();
        const timerId = setInterval(() => {
            refreshList();
        }, 3000);
        return () => {
            clearInterval(timerId);
        }
    }, []);

    const refreshList = () => {
        API.getCurrentTickets().then(list => {
            setPreviousList(prevList);
            prevList = list;
            setDeskList(list);
        }).catch(err => {
            console.log(err);
        });
    }

    return <Container className="center" style={{ padding: 20}}>
        <ListGroup horizontal>
            { deskList.map(desk => 
                <ListGroup.Item key={desk.counter_id}>
                    <DeskBoard desk={desk} previousList={previousList} />
                </ListGroup.Item>)
            }
        </ListGroup>
    </Container>
}

export default MainBoard;