import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, Alert, Col } from 'react-bootstrap';

const FilterForm = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity() == false) {
            event.stopPropagation()
            setISValid(true);
        } else {
            setISValid(flase)
        }
    };

    return (
        <>
            <Card>
                <Card.Header className='d-flex justify-content-between'>
                    Select Filters
                </Card.Header>
                <Card.Body>
                    {/*TODO*/}
                </Card.Body>
                <Card.Footer>
                    <Button className='float-right' variant="success" type="submit" size='sm' form='statsForm'>Update Filters</Button>
                </Card.Footer>
            </Card>
            <div className='card-space'></div>
        </>
    );
};

export default FilterForm;