import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import API from './API';
import ServerError from './ServerError';

const Statistics = (props) => {

    //state to wait server response
    const [isLoading, setIsLoading] = useState(true);
    // state for an error of the server response
    const [serverError, setServerError] = useState(false);
    // default filters to retrive stats data from the server
    const defaultFilters = {counter: 0, service_type: 1, time_period: 0}
    // state to keep track of the selected filters
    const [filters, setFilters] = useState(defaultFilters)
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
    }, [serverError]);

    return (
        <>
            {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
            {isLoading ? null :
                <>
                    {serverError ? <ServerError serverError={serverError} /> :
                        <>
                            {/*TODO*/}
                        </>
                    }
                </>
            }
        </>
    );
};

export default Statistics;