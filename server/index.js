// REQUIRE DEPS
require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');

// AUTH0 Login Setup
const strategy = require('./strategy');

// Endpoint functionality
const { getCart, addToCart } = require('./controllers/cartCtrl');
const { getProducts } = require('./controllers/productCtrl');
const { getUser, logout } = require('./controllers/userCtrl');

// PORT
const port = process.env.SERVER_PORT || 3001;

// Server Setup
const app = express();

// DB Connection
massive(process.env.CONNECTION_STRING)
  .then(dbInstance => app.set('db', dbInstance))
  .catch(err => console.log(err));

// MIDDLEWARES
app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Passport Middleware For Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

// What properties do we want our user to have on session?
passport.serializeUser((profile, done) => {
  const db = app.get('db');
  db.get_user_by_authid(profile.id).then(user => {
    if (!user[0]) {
      db.add_user_by_authid(profile.id, profile.displayName)
        .then(response => {
          return done(null, response[0]);
        })
        .catch(err => console.log(err));
    } else {
      return done(null, user[0]);
    }
  });
});

// Put user on req.session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Add a cart to the session
app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
});

// Endpoints
app.get('/api/products', getProducts);

app.get('/api/cart', getCart);
app.post('/api/cart', addToCart);

// Login, redirect to frontend on success or failure
app.get(
  '/login',
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/shop',
    failureRedirect: 'http://localhost:3000/#/'
  })
);

// Access user, logout user
app.get('/api/me', getUser);
app.get('/logout', logout);

app.listen(port, () => {
  console.log('App listening on port 3001!');
});
