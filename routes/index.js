const { Router } = require('express');
const passport = require('passport');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { model, getUserName, addUser, getWebhook, addWebHook, updateWebhook } = require('../db-pgsql/index');
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
    const user = await getUserName(username);
    if (user) {
      bcrypt.compare(password, user.dataValues.password, (error, check) => {
        if (error) {
          return done();
        }
        if (check) {
          return done(null, [{ email: user.dataValues.email }]);
        }
        return done(null, false);
      });
    }
  },
));

router.get('/register', (req, res) => {
  res.render('../views/register.ejs');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await getUserName(email);
    if (user) {
      console.log('email already exists');
      res.redirect('/login');
    } else {
      await addUser(uuidv4(), email, hashedPassword);
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/isLoggedIn', (req, res) => {
  res.json(isAuthenticated(req));
});

router.post('/saveWebhook', async (req, res) => {
  const { email } = req.user[0];
  const { webhookURL } = req.body;
  try {
    const user = await getUserName(email);
    if (user) {
      const webhook = await getWebhook(user.dataValues.id);
      if (webhook) {
        await updateWebhook(webhookURL, user.dataValues.id);
      } else {
        await addWebHook(uuidv4(), webhookURL, user.dataValues.id);
      }
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/getWebhook', async (req, res) => {
  const { email } = req.user[0];
  try {
    const user = await getUserName(email);
    if (user) {
      const webhook = await getWebhook(user.dataValues.id);
      if (webhook) {
        res.json(webhook.dataValues.webhook);
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
});

// router.post('/forgotPassword', (req, res) => {

// });

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = router;
