
import CounterInfo from './CounterInfo';
import Queue from './model/Queue';
import Service from './model/Service';

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

async function getQueues(service) {

  let response = await fetch(SERVER_URL + BASEURL + `/queue/` + service);
  let queuesJson = await response.json();

  if (response.ok) {
    return queuesJson.map((x) => x);
  } else {
    throw queuesJson;  // an object with the error coming from the server
  }
}

async function getServices() {

  let response = await fetch(SERVER_URL + BASEURL + `/services` );
  let queuesJson = await response.json();

  if (response.ok) {
    return queuesJson.map((x) => new Service(x.id, x.name, x.service_time));
  } else {
    throw queuesJson;  // an object with the error coming from the server
  }
}

// setInterval(getCountersTicket, 2000);

const API = { getCountersTicket, getQueues, getServices };
export default API;