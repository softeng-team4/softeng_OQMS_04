
import StatisticTuple from './model/StatisticTuple';

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