import Card from 'react-bootstrap/Card';

function DeskBoard(props) {
    return (
        <Card>
            {// use props.desk to get data
            }
          <Card.Header as="h4">DeskName</Card.Header>
          <Card.Body>
            <Card.Title>We are serving <i><b>T1</b></i></Card.Title>
            <Card.Text>
              Supported services list
            </Card.Text>
          </Card.Body>
        </Card>
    );
}

export default DeskBoard;