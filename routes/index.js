const { Router } = require('express');
const passport = require('passport');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('../db-pgsql/index');
const { isAuthenticated } = require('../modules/auth');

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/login', (req, res) => {
  res.render('../views/login.ejs', { name: 'Chris' });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect('/');
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
  },
  async (username, password, done) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      JSON.stringify(client.query('SELECT id, "email", "password" FROM "users" WHERE "email"=$1', [username], (err, result) => {
        if (err) {
          return done(err);
        }
        if (result.rows[0] === null) {
          return done(null, false);
        }
        bcrypt.compare(password, result.rows[0].password, (error, check) => {
          if (error) {
            console.log('Error while checking password');
            return done();
          }
          if (check) {
            console.log('Logged in!');
            return done(null, [{ email: result.rows[0].email }]);
          }
          return done(null, false);
        });
      }));
    } catch (e) {
      console.log(e);
    }
  },
));

router.get('/register', (req, res) => {
  res.render('../views/register.ejs');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await pool.connect();
    await client.query('BEGIN');
    const hashedPassword = await bcrypt.hash(password, 10);
    await JSON.stringify(client.query('SELECT id FROM "users" WHERE "email"=$1', [email], (err, result) => {
      if (result.rows[0]) {
        console.log('email already exists');
        res.redirect('/login');
      } else {
        client.query('INSERT INTO users (id, email, password) VALUES ($1, $2, $3)', [uuidv4(), email, hashedPassword], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            client.query('COMMIT');
            console.log(result);
            res.redirect('/');
          }
        });
      }
    }));
    client.release();
  } catch (e) {
    console.log(e);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  console.log('Logged out!');
  res.redirect('/');
});

router.get('/isLoggedIn', (req) => isAuthenticated(req));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = router;
