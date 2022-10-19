import Card from 'react-bootstrap/Card';

function DeskBoard(props) {
  // se desk in previousList then evidenzia
  const isNew = props.previousList.length !== 0 && props.previousList.find(d => {
    return d.counter_id === props.desk.counter_id && d.ticket_id === props.desk.ticket_id
  });
  
  return (
      <Card align='center' style={isNew === undefined ? { backgroundColor: 'Yellow' } : {}}>
        <Card.Header as="h4">{"Counter " + props.desk.counter_id}</Card.Header>
        <Card.Body>
          <Card.Title>We are serving</Card.Title>
          <Card.Title>Ticket #<i><b>{props.desk.ticket_id}</b></i></Card.Title>
        </Card.Body>
      </Card>
  );
}

export default DeskBoard;