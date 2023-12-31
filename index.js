const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment');
const uuid = require('uuid');
const SHA256 = require('crypto-js/sha256');
const HmacSHA256 = require('crypto-js/hmac-sha256');

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.use(
  cors({
    origin: "*"
  })
)

app.get('/api/v1/ping', (req, res) => {
  res.status(200).json({
    success: true,
    date: moment()
  })
})

const headers = (req) => {
  return {
    'X-REQUEST-ID': req.header('x-request-id'), 
    'X-TIMESTAMP': req.header('x-timestamp'),  
    'X-CHANNEL-ID': req.header('x-channel-id'), 
    'X-SIGNATURE': req.header('x-signature'),
    'X-DEVICE-ID': req.header('x-device-id'), 
    'X-DEVICE-INFO': req.header('x-device-info'), 
    'Authorization': req.header('authorization'),
    'Content-Type': 'application/json'
  }
}

app.post('/api/v1/users/login', (req, res) => {
  let config = {
    method: 'POST',
    url: `${process.env.API_URL}/api/v1/users/login`,
    headers: headers(req),
    data: req.body
  }


  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.get('/api/v1/users/info', (req, res) => {
  let config = {
    method: 'GET',
    url: `${process.env.API_URL}/api/v1/users/info`,
    headers: headers(req)
  }
  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.get('/api/v1/users/refreshToken', (req, res) => {
  let config = {
    method: 'GET',
    url: `${process.env.API_URL}/api/v1/users/refreshToken`,
    headers: headers(req),
    params: req.query
  }

  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.get('/api/v1/users/logout', (req, res) => {
  let config = {
    method: 'GET',
    url: `${process.env.API_URL}/api/v1/users/logout`,
    headers: headers(req),
    params: req.query
  }

  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.get('/api/v1/banks', (req, res) => {
  let config = {
    method: 'GET',
    url: `${process.env.API_URL}/api/v1/banks`,
    headers: headers(req),
    params: req.query
  }

  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.get('/api/v1/creditors', (req, res) => {
  let config = {
    method: 'GET',
    url: `${process.env.API_URL}/api/v1/creditors`,
    headers: headers(req),
    params: req.query
  }

  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.get('/api/v1/creditors/:uid', (req, res) => {
  let config = {
    method: 'GET',
    url: `${process.env.API_URL}/api/v1/creditors/${req.params.uid}`,
    headers: headers(req),
    params: req.query
  }

  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.post('/api/v1/creditors', (req, res) => {
  let config = {
    method: 'GET',
    url: `${process.env.API_URL}/api/v1/creditors`,
    headers: headers(req),
    data: req.body
  }

  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.delete('/api/v1/creditors/:uid', (req, res) => {
  let config = {
    method: 'GET',
    url: `${process.env.API_URL}/api/v1/creditors/${req.params.uid}`,
    headers: headers(req),
    params: req.query
  }

  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.put('/api/v1/creditors/:uid', (req, res) => {
  let config = {
    method: 'GET',
    url: `${process.env.API_URL}/api/v1/creditors/${req.params.uid}`,
    headers: headers(req),
    data: req.body
  }

  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error?.response?.data)
    })
})

app.listen(5001, () => console.log("Backend server is running!"));

module.exports = app;