
const SERVER_URL = 'http://localhost:3001';

import CounterInfo from './CounterInfo';
const BASEURL = '/api';

async function getCountersTicket() {
  
  let response = await fetch(SERVER_URL + BASEURL + '/countersTicket');
  let countersTicketsJson = await response.json();
  
  if (response.ok) {
    return countersTicketsJson.map((x) => CounterInfo.from(x));
  } else {
    throw countersTicketsJson;  // an object with the error coming from the server
  }
}

setInterval(getCountersTicket, 2000);

const API = { logIn, getUserInfo, logOut, getCountersTicket };
export default API;