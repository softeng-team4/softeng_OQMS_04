'use strict';
const sqlite = require("sqlite3")
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require("./db");
const port = 3001;
const app = new express();
app.use(morgan('common'));
app.use(express.json())
app.use(cors());
const { nextTicket } = require('./dao/officerDao');

/*const express = require('express');
const morgan = require('morgan'); // logging middleware
const cors = require('cors');

const { validationResult, body, param, check } = require('express-validator');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const { nextTicket } = require('./dao/officerDao');

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
*/


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

/*** Officer APIs ***/

// PUT /api/officer/ticket
app.put("/api/officer/ticket", async (req, res) => {
  try {
    console.log("server reached. Req body:" + req.body.counter + " " + req.body.served)
    const result = await nextTicket(req.body.counter, req.body.served);
    console.log("concluded query with return value " + result)
    const resBody = {
      next: result
    }
    console.log(resBody)
    return res.status(200).json(resBody)
  }
  catch (err) {
    return res.status(500).end()
  }
}
)