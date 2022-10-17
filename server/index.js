'use strict';

const express = require('express');
const dayjs = require('dayjs');
const morgan = require('morgan'); // logging middleware
const cors = require('cors');
const TicketDAO = require('./TicketDAO');   
const ServiceDAO = require('./ServiceDAO');
const CounterDAO = require('./CounterDAO');
const ServiceCounterDAO = require('./Service-CounterDAO');

const { validationResult, body, param, check } = require('express-validator');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

// init express
const app = express();
const port = 3001;

// set up the middlewares
app.use(morgan('dev'));
app.use(express.json()); // for parsing json request body
// set up and enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDao.getUser(username, password)
  if (!user)
    return cb(null, false, 'Incorrect username or password.');

  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { // this user is id + email + name
  return cb(null, user);
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authorized' });
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

const ticketDao = new TicketDAO("office.db");
const serviceDao = new ServiceDAO("office.db");
const counterDao = new CounterDAO("office.db");
const serviceCounterDAO = new ServiceCounterDAO("office.db");


/*** User APIs ***/

// POST /api/sessions
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).send(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      return res.status(201).json(req.user);
    });
  })(req, res, next);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  }
  else
    res.status(401).json({ error: 'Not authenticated' });
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



/*** TICKET APIs ***/

// POST /api/ticket/

app.post('/api/ticket/:service', async (req,res) =>{

  try{
    const lastID = await ticketDao.getLastTicket(req.params.service);
    //get expected waiting time
    serTime = await serviceDao.getServiceTime(req.params.service);
    peopleAhead = /* get number of people ahead */ 2;
    await ticketDao.createTicket(req.params.service, lastID + 1, exp_waitTime);
    //add ticket to the corresponding queue
    return res.status(401).json();
  }
  catch(err){
    console.log(err);
    return res.status(500).json({error: 'Internal Server Error'});
  }
})