
import StatisticTuple from './model/StatisticTuple';

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


async function createTicket(serviceId) {
  const url = SERVER_URL + '/api/ticket/' + serviceId;
  try {
      const response = await fetch(url, {
          method: 'POST',
      });
      if (response.ok) {
        let ticket = await response.json();
        console.log(ticket);
        return ticket;
      } else {
        const text = await response.text();
        console.log(text);
        throw new TypeError(text);
      }
  } catch (ex) {
      console.log(ex);
      throw ex;
  }
}

// Manager Statistics APIs

const getStatistics = async (filters) => {
  const url = '/api/statistics/';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters)
  });

  if (!response.ok) {
    try {
      let errDetail = await response.json();
      throw new Error(errDetail);
    }
    catch (err) {
      const errDetail = { error: 'Server Unreachable' };
      throw errDetail;
    }
  } else {
    const jsonManagerStats = await response.json();
    return jsonManagerStats.map(s => StatisticTuple.from(s));
  }
}

const API = { logIn, getUserInfo, logOut, getStatistics };
export default API;