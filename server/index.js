'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const cors = require('cors');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const hikes=require('./modules/Hikes.js');
const authN = require('./modules/authN.js');

/*** Set up Passport ***/
//configurating function to verify login and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    authN.checkCredentials(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
        
      return done(null, user);
    })
  }
));

// getting session from user 
passport.serializeUser((user, done) => {
  done(null, user.Id);
});

// getting user from session
passport.deserializeUser((id, done) => {
  authN.getUserbyId(id)
    .then(user => {
      done(null, user); 
    }).catch(err => {
      done(err, null);
    });
});

// checking if the request is coming from an authenticated user or not, so to allow authorized users to perform actions
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next();
  
  return res.status(401).json({ error: 'not authenticated'});
}

/*** Ending setting up passport***/ 

// init express
const app = new express();
const port = 3001;

//init middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions))

// set up the session
app.use(session({
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false 
}));

//initializing passport
app.use(passport.initialize());
app.use(passport.session());



//get hikes full list
app.get('/getHikes', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({error: 'cannot process request'});
    }
    hikes.getHikes()
      .then(list => res.json(list))
      .catch(() => res.status(500).end());
  });

//get the filtered hikes
app.get('/getFilteredHikes', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({error: 'cannot process request'});
    }

    let filters = req.body;

    try {
        let list = await hikes.getHikes();
        let returned = filtering(filters, list);
        res.status(200).json(returned);
      } catch(err) {
        res.status(503).json({error: `Error`});
      }
  });

  //filtering function
let filtering = (filters, list) => {
    let vec = [];
    let flag = true;
    list.forEach(l => {
            if(typeof filters.Difficulty !== 'undefined')
            {
                if(l.Difficulty !== filters.Difficulty){return;}
                
            }
            if(typeof filters.MapId !== 'undefined')
            {
                if(l.MapId !== filters.MapId){return;}
            }
            if(typeof filters.Ascent !== 'undefined')
            {
                if(l.Ascent !== filters.Ascent){return;}
            }
            if(typeof filters.ExpectedTime !== 'undefined')
            {
                if(l.ExpectedTime !== filters.ExpectedTime){return;}
            }
            if(typeof filters.Length !== 'undefined')
            {
                if(l.Length !== filters.Length){return;}
            }
            vec.push(l);
        });
    return vec;
}

/*** Users APIs ***/

// POST /sessions 
// login
app.post('/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        return res.status(401).json(info);
      }
      req.login(user, (err) => {
        if (err)
          return next(err);
        return res.json(req.user);
      });
  })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.delete('/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// GET /sessions/current
// check if user is logged in or not
app.get('/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });