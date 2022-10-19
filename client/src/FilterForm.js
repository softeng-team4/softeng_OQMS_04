import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Button, OverlayTrigger, Tooltip, DropdownButton, Dropdown } from 'react-bootstrap';
import { ArrowClockwise, XCircle } from 'react-bootstrap-icons';

const FilterForm = (props) => {

    const colors = {
        0: 'primary',
        1: 'success',
        2: 'danger',
        3: 'info'
    }

    const changeFilters = (filterName, val) => {
        var temp = props.filters.filter(f => (Object.keys(f)[0] !== filterName))
        temp = [...temp, {[filterName]: val}]
        props.setFilters(temp)
    };

    const checkIfAvailable = (filterName) => {
        const timeFilterList = ['day', 'week', 'month']
        return !timeFilterList.includes(filterName) ? false :
            props.filters.filter(f => timeFilterList.includes(Object.keys(f)[0]))
                         .map(f => Object.values(f)[0])
                         .reduce((x,y) => (x + y), 0) > 0 ? true : false;
    };

    return (
        <>
            <div className='card-space'></div>
            <Card>
                <Card.Body className='d-flex justify-content-between'>
                    <Col className="d-flex justify-content-start">
                        Selected filters: 
                        {props.filters
                            .filter(f => (Object.values(f)[0] === 1))
                            .map((f, idx) => {
                                return  <>&nbsp;<Button key={'selB_'+Object.keys(f)[0]+'_'+idx} id={Object.keys(f)[0]} variant={colors[idx]} size={'sm'} onClick={(ev) => (changeFilters(ev.currentTarget.id, 0))}>
                                            {Object.keys(f)[0].replace("_", " ") + " "}<XCircle key={'selX_'+Object.keys(f)[0]+'_'+idx}/>
                                        </Button></> 
                            })
                        }
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <DropdownButton className='d-flex jusify-content-start' title={"Add filter"} variant={'outline-secondary'} size={'sm'}>
                        {props.filters
                            .filter(f => (Object.values(f)[0] === 0))
                            .map((f, idx) => {
                                return  <>&nbsp;<Button key={'unselB_'+Object.keys(f)[0]+'_'+idx} id={Object.keys(f)[0]} variant={colors[idx]} size={'sm'} onClick={(ev) => (changeFilters(ev.currentTarget.id, 1))} disabled={checkIfAvailable(Object.keys(f)[0])}>
                                            {Object.keys(f)[0].replace("_", " ")}
                                        </Button></>
                                        
                            })
                        }
                        </DropdownButton>
                        &nbsp;
                        <OverlayTrigger placement='top' overlay={<Tooltip id={`tooltip-top`}>Reload Filters</Tooltip>}>
                            <Button className='float-right' variant="success" type="submit" size='sm' form='statsForm' onClick={(ev) => {props.setUpdate(!props.update)}}><ArrowClockwise/></Button>
                        </OverlayTrigger>
                    </Col>
                </Card.Body>
            </Card>
            <div className='card-space'></div>
            <Card>

            </Card>
        </>
    );
};

export default FilterForm;