
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

async function getAllServices() {
  const url = SERVER_URL + '/api/services';
  try {
      const response = await fetch(url);
      if (response.ok) {
          // process the response
          const serviceList = await response.json();
          return serviceList;
      } else {
          // application error (404, 500, ...)
          const text = await response.text();
          console.log(text);
          throw new TypeError(text);
      }
  } catch (ex) {
      // network error
      console.log(ex);
      throw ex;
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

const API = { logIn, getUserInfo, logOut, getAllServices, createTicket };
export default API;