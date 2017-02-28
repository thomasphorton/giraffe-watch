var express = require('express');
var cookieSession = require('cookie-session');
var app = express();
var request = require('request').defaults({encoding: null});
var bodyParser = require('body-parser');

var AWS = require('aws-sdk');
var sns = new AWS.SNS({
  region: 'us-west-2'
});

var config = {
  port: 80,
  topicArn: 'arn:aws:sns:us-west-2:484448430090:giraffe-watch'
}

var exports = {};

app.set('view engine', 'pug');
app.set('trust proxy', 1);

var sessionParams = {
  name: 'session',
  keys: ['secret']
}

app.use(cookieSession(sessionParams));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  console.log('GET index');

  res.render('index', {
    title: 'Giraffe Watch!',
    alert: {
      type: 'danger',
      message: 'We\'re at capacity! Follow us on social media for further alerts.'
    }
  });
});

app.get('/update-1', function (req, res) {
  console.log('GET update-1');

  res.render('update-1', {
    title: 'Giraffe Watch Update 1!',
    alert: {
      type: 'danger',
      message: 'We\'re at capacity! Follow us on social media for further alerts.'
    }
  });
});

app.get('/watch', function (req, res) {
  console.log('GET watch');

  res.render('watch', {
    title: 'Watch April the Giraffe Give Birth',
    alert: {
      type: 'danger',
      message: 'We\'re at capacity! Follow us on social media for further alerts.'
    }
  });
});

app.get('/facts', function (req, res) {
  console.log('GET facts');

  res.render('facts', {
    title: 'Top Giraffe Facts',
    alert: {
      type: 'danger',
      message: 'We\'re at capacity! Follow us on social media for further alerts.'
    }
  });
});

app.get('/privacy', function (req, res) {
  console.log('GET privacy');

  res.render('privacy', {
    title: 'Giraffe Watch 2017 Privacy Policy',
    alert: {
      type: 'danger',
      message: 'We\'re at capacity! Follow us on social media for further alerts.'
    }
  });
});

app.get('/unsubscribe', function(req, res) {
  console.log('GET unsubscribe');

  res.render('unsubscribe', {
    title: 'Unsubscribe from Giraffe Watch',
    alert: {
      type: 'danger',
      message: 'We\'re at capacity! Follow us on social media for further alerts.'
    }
  });
});

app.get('/submit', function(req, res) {
  console.log('GET submit');

  res.render('subscribe', {
    title: 'Subscribed to Giraffe Watch!',
    email: 'test@example.com',
    alert: {
      type: 'danger',
      message: 'We\'re at capacity! Follow us on social media for further alerts.'
    }
  });
});

app.post('/submit', function(req, res) {
  console.log('POST submit');

  var email = req.body.email;

  var params = {
    Protocol: 'email',
    TopicArn: config.topicArn,
    Endpoint: email
  };

  sns.subscribe(params, function(err, data) {
    if (err) {
      console.log('sns subscribe error: "%s"', email);
      console.log(err, err.stack);

      res.render('index', {
        title: 'Giraffe Watch!',
        alert: {
          type: 'danger',
          message: 'An error occurred while subscribing. Please try again in a few minutes.'
        }
      });
    } else {
      console.log('Subscribed: %s', email);
      res.render('subscribe', {
        title: 'Subscribed to Giraffe Watch!',
        email: email
      });
    }
  });
});

app.get('/comments', function(req, res) {
  res.render('comments', {
    title: 'Giraffe Watch Discusion!'
  });
});

app.listen(config.port, function () {
  console.log('Giraffe Watch running on port %s!', config.port);
});