'use strict';

const express = require('express');
const morgan = require('morgan');
// this will load our .env file if we're
// running locally. On Gomix, .env files
// are automatically loaded.
require('dotenv').config();

const {ALERT_FROM_EMAIL, ALERT_FROM_NAME, ALERT_TO_EMAIL} = process.env;
const {logger} = require('./utilities/logger.js');
// these are custom errors we've created
const {FooError, BarError, BizzError} = require('./middlewares/errors.js');

const {sendEmail} = require('./middlewares/emailer.js');
// const emailSeverity = require('./middlewares/triggerEmail');

const app = express();



// this route handler randomly throws one of `FooError`,
// `BarError`, or `BizzError`
const russianRoulette = (req, res) => {
  const errors = [FooError, BarError, BizzError];
  throw new errors[
    Math.floor(Math.random() * errors.length)]('It blew up!');
};

function emailTrigger(sendEmail){
  (req, res, next, errors) => {
    ///if the error is a FooError or BarError
    if(errors instanceof 'FooError' || errors instanceof 'BarError'){
      const {emailData} = 
      {
       from: ALERT_FROM_EMAIL,
       to: ALERT_TO_EMAIL,
       subject: `SERVICE ALERT: ${errors.name}`,
       text: `An error was encountered on ${errors.stack}`,
       html: "<p>HTML version</p>"
      }
      sendEmail();
    }
    next();
  }
}


app.use(morgan('common', {stream: logger.stream}));

// for any GET request, we'll run our `russianRoulette` function
app.get('*', russianRoulette);

app.use(emailTrigger);


// YOUR MIDDLEWARE FUNCTION should be activated here using
// `app.use()`. It needs to come BEFORE the `app.use` call
// below, which sends a 500 and error message to the client

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({error: 'Something went wrong'}).end();
});

const port = process.env.PORT || 8080;

const listener = app.listen(port, function () {
  logger.info(`Your app is listening on port ${port}`);
});