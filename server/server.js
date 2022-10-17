'use strict';

// init express
const express = require('express');
const cors = require('cors');
const dayjs=require('dayjs');
const passport = require('passport');
const session = require('express-session');
const TicketDAO = require('./dao/TicketDAO');   
const ServiceDAO = require('./dao/ServiceDAO');
const CounterDAO = require('./dao/CounterDAO');
const ServiceCounterDAO = require('./dao/Service-CounterDAO');
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