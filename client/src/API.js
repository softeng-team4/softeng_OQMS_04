
const SERVER_URL = 'http://localhost:3001';

const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  // an object with the error coming from the server
  }
};

const logOut = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

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