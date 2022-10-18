import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import API from './API';
import ServerError from './ServerError';
import FilterForm from './FilterForm';

const Statistics = (props) => {

    //state to wait server response
    const [isLoading, setIsLoading] = useState(true);
    // state for an error of the server response
    const [serverError, setServerError] = useState(false);
    // default filters to retrive stats data from the server
    const defaultFilters = [{counter: 0}, {service_type: 1}, {time_period: 1}]
    // state to keep track of the selected filters
    const [filters, setFilters] = useState(defaultFilters)
    // state for holding retrived stats from the server
    const [tuples, setTuples] = useState(undefined)
    // state to trigger update of filters
    const [update, setUpdate] = useState(false)

    // get stats from server
    useEffect(() => {
        // API.getStatistics(filters).then((tuples) => {
        //     setTuples(tuples);
        //     setIsLoading(false);
        // }).catch(err => {
        //     setServerError(err.error);
        //     setIsLoading(false);
        // });
        console.log("Works!")
        setIsLoading(false);
    }, [serverError, update]);

    return (
        <>
            {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
            {isLoading ? null :
                <>
                    {serverError ? <ServerError serverError={serverError} /> :
                        <>
                            <Row>
                                <Col />
                                <Col md={6} >
                                    <FilterForm filters={filters} setFilters={setFilters} update={update} setUpdate={setUpdate}/>
                                </Col>
                                <Col />
                            </Row>
                        </>
                    }
                </>
            }
        </>
    );
};

export default Statistics;