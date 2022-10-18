'use strict';

// init express
const express = require('express');
const cors = require('cors');
const dayjs=require('dayjs');
const passport = require('passport');
const session = require('express-session');
const TicketDAO = require('./TicketDAO');   
const ServiceDAO = require('./ServiceDAO');
const CounterDAO = require('./CounterDAO');
const ServiceCounterDAO = require('./Service-CounterDAO');
const PORT = 3001;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

let app = new express();
app.use(express.json());
app.use(cors(corsOptions));

const ticketDao = new TicketDAO("office.db");
const serviceDao = new ServiceDAO("office.db");
const counterDao = new CounterDAO("office.db");
const serviceCounterDAO = new ServiceCounterDAO("office.db");

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));

// GET /api/countersTicket
app.get('/api/countersTicket', async (req, res) => {
    try {
      const currentCountersTicket = await dao.currentTicket();
      res.json(currentCountersTicket);
    } catch(err) {
      res.status(500).end();
    }
  });