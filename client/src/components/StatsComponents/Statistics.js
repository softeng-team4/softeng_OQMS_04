import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import API from '../../API';
import ServerError from './ServerError';
import FilterForm from './FilterForm';
import StatsTable from './StatsTable';

const Statistics = () => {

    //state to wait server response
    const [isLoading, setIsLoading] = useState(true);
    // state for an error of the server response
    const [serverError, setServerError] = useState(false);
    // default filters to retrive stats data from the server
    const defaultFilters = [{counter: 0}, {service_type: 1}, {day: 0}, {week: 0}, {month: 0}]
    // state to keep track of the selected filters
    const [filters, setFilters] = useState(defaultFilters)
    // state to keep track of the filters selected in the form
    const [formFilters, setFormFilters] = useState(filters)
    // state for holding retrived stats from the server
    const [tuples, setTuples] = useState(undefined)

    // get stats from server
    useEffect(() => {
        API.getStatistics(filters).then((tuples) => {
            setTuples(tuples);
            setIsLoading(false);
        }).catch(err => {
            setServerError(err.error);
            setIsLoading(false);
        });
    }, [serverError, filters]);

    const updateHandler = () => {
        setFilters(formFilters);
    };

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
                                    <FilterForm filters={formFilters} setFilters={setFormFilters} updateHandler={updateHandler}/>
                                    <StatsTable filters={filters} tuples={tuples}/>
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