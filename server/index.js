require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');

const strategy = require('./strategy');
const { getCart, addToCart } = require('./controllers/cartCtrl');

const port = process.env.SERVER_PORT || 3001;

const app = express();

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => app.set('db', dbInstance))
  .catch(err => console.log(err));

app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

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

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
});

app.get('/api/products', (req, res) => {
  req.app
    .get('db')
    .get_products()
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});

app.get('/api/cart', getCart);
app.post('/api/cart', addToCart);

app.get(
  '/login',
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/shop',
    failureRedirect: 'http://localhost:3000/'
  })
);

app.get('/api/me', (req, res) => {
  if (!req.user) res.sendStatus(401);
  else res.status(200).send(req.user);
});

app.listen(port, () => {
  console.log('App listening on port 3001!');
});
