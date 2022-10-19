import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';


const StatsTable = (props) => {

    const cntList = ['counter'];
    const tosList = ['service_type'];
    const timeList = ['day', 'week', 'month'];

    const hideColoumn = (keys) => {
        return props.filters.filter(f => (keys.includes(Object.keys(f)[0])))
                     .map(f => (Object.values(f)[0]))
                     .reduce((x,y) => (x+y), 0) > 0 ? false : true;
    };

    const timeFilter = () => {
        var timeObj = props.filters.filter(f => (f['day'] || f['week'] || f['month']))[0];
        return  !timeObj ? 'None' :
                    Object.keys(timeObj)[0] === 'day' ? 'Day' :
                        Object.keys(timeObj)[0] === 'week' ? 'Week' :
                            Object.keys(timeObj)[0] === 'month' ? 'Month' : 'None';
    };

    return (
        <>
            <Table size={'sm'} striped bordered hover>
                <thead>
                    <tr>
                        <th hidden={hideColoumn(cntList)}>Counter</th>
                        <th hidden={hideColoumn(tosList)}>Type of Service</th>
                        <th hidden={hideColoumn(timeList)}>{timeFilter()}</th>
                        <th># of customers</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tuples.map((tuple, idx) => {
                        return  <>
                                    <tr key={'row_' + idx}>
                                        <td key={'col_counter_' + idx} hidden={hideColoumn(cntList)}>{tuple.counterId}</td>
                                        <td key={'col_tos_' + idx} hidden={hideColoumn(tosList)}>{tuple.tos}</td>
                                        <td key={'col_time_' + idx} hidden={hideColoumn(timeList)}>{tuple.date}</td>
                                        <td key={'col_customer_' + idx}>{tuple.ticketsNumber}</td>
                                    </tr>
                                </>
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default StatsTable;