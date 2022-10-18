'use strict';

// init express
const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
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

/*SERVICE APIs */

app.get('/api/services', async (req,res) =>{
    try{
        const services = await serviceDao.getServices();
        return res.status(200).json(services);
    }
    catch(err){
        console.log(err);
        return res.status(500).json("Internal server error");
    }
})

/* TICKET APIs */

app.post('/api/ticket/:serviceId', async (req,res) =>{
    try{
        const service = await serviceDao.getService(req.params.serviceId);
        if(!service)
            return res.status(404).json("Not found");
        const nPeople = await ticketDao.getQueueLength(req.params.serviceId);
        const nServices = await serviceCounterDAO.getNServicesCountersWService(req.params.serviceId);
        let waitTime = 0;
        for(let n of nServices){
            waitTime += 1/n;
        }
        waitTime = service.service_time* (nPeople/waitTime + 0.5);
        const ticketNumber = await ticketDao.createTicket(req.params.serviceId,waitTime);
        return res.status(201).json({num: ticketNumber, waitTime: waitTime});
    }
    catch(err){
        console.log(err);
        return res.status(500).json("Internal server error");
    }
})

/*  Queue API*/
app.get('/api/queue/:serviceId', async (req,res) =>{
    try{
        const queue = await ticketDao.getQueue(req.params.serviceId);
        return res.status(200).json(queue);
    }
    catch(err){
        console.log(err);
        return res.status(500).json("Internal server error");
    }
})

// GET /api/countersTicket
app.get('/api/countersTicket', async (req, res) => {
    try {
      const currentCountersTicket = await dao.currentTicket();
      res.json(currentCountersTicket);
    } catch(err) {
      res.status(500).end();
    }
  });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));

