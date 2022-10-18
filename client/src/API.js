
import CounterInfo from './model/CounterInfo';

const SERVER_URL = 'http://localhost:3001';
const BASEURL = '/api';

async function getCountersTicket() {
  
  let response = await fetch(SERVER_URL + BASEURL + '/countersTicket');
  let countersTicketsJson = await response.json();
 
  if (response.ok) {
    return countersTicketsJson.map((x) => new CounterInfo(x.ticket_id, x.counter_id));
  } else {
    throw countersTicketsJson;  // an object with the error coming from the server
  }
}

// setInterval(getCountersTicket, 2000);

const API = { getCountersTicket };
export default API;