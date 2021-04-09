const { Router } = require('express');
const passport = require('passport');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {
  getUserName,
  addUser,
  getWebhook,
  addWebHook,
  updateWebhook,
  updateForgotPassword,
  updateUserPassword,
  findUserByToken,
  deleteWebhook,
} = require('../models/index');

const { isAuthenticated } = require('../modules/auth');

dotenv.config({ path: path.join(__dirname, '../.env') });

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
}), (req, res) => {
  res.send('Success');
});

router.get('/currentUser', (req, res) => {
  res.json(req.user[0].email);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    const user = await getUserName(username);
    if (user) {
      bcrypt.compare(password, user.dataValues.password, (error, check) => {
        console.log(check)
        if (error) {
          console.log('error! ', error)
          return done();
        }
        if (check) {
          return done(null, [{ email: user.dataValues.email }]);
        }
        console.log('done')
        return done(null, false);
      });
    } else {
      return done(null, false);
    }
  },
));

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const user = await getUserName(email);
    if (user) {
      res.send('Failure');
    } else {
      await addUser(uuidv4(), email, hashedPassword);
      res.send('Success');
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/isLoggedIn', async (req, res) => {
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

router.post('/forgotPassword', async (req, res) => {
  const { emailValue } = req.body;
  if (!emailValue) {
    res.sendStatus(400);
    console.log('No email exists');
  } else {
    const user = await getUserName(emailValue);
    if (user) {
      const token = crypto.randomBytes(20).toString('hex');
      await updateForgotPassword(user.dataValues.id, token, Date.now() + 360000);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        name: 'www.gmail.com',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: 'donkwizard@gmail.com',
        to: `${user.dataValues.email}`,
        subject: 'Your password reset link',
        text: 'You are receiving this message in response to your request to reset your password.\n\n'
          + 'Please click the following link or paste into your browser to complete the process (link expires within 1 hour).\n\n'
          + `http://donkwizard.net/resetpassword/${token}\n\n`
          + 'If you did not request this, please ignore and your password will remain unchanged\n',
      };
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          console.log(response);
          res.status(200);
        }
      });
    }
  }
});

router.get('/reset', async (req, res) => {
  const oneHour = 60 * 60 * 1000;
  const { resetPasswordToken } = req.query;
  try {
    const user = await findUserByToken(resetPasswordToken);
    if (user && (Date.now() - user.dataValues.resetpasswordexpires < oneHour)) {
      res.status(200).send({
        email: user.dataValues.email,
      });
    } else {
      res.json(false);
    }
  } catch (e) {
    console.log(e);
  }
});

router.post('/updatePasswordFromEmail', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUserPassword(email, hashedPassword);
  } catch (e) {
    console.log(e);
  }
});

router.put('/deleteWebhook', async (req, res) => {
  const { email } = req.user[0];
  try {
    const user = await getUserName(email);
    if (user) {
      await deleteWebhook(user.dataValues.id);
      res.json('Success')
    }
  } catch (e) {
    console.log(e)
  }
})

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = router;
