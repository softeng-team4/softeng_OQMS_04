const SERVER_URL = 'http://localhost:3001';

const nextTicket = async (counterId, ticketId) => {
  const response = await fetch(SERVER_URL + '/api/officer/ticket', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
        counter: counterId,
        served: ticketId
    }),
  });
  if (response.ok) {
    const res = await response.json();
    return res.next;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};


const OfficerAPI = { nextTicket };
export default OfficerAPI;