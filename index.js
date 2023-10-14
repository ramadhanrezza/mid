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
    url: process.env.API_SIGNATURE_SECRET
  })
})

app.post('/api/v1/users/login', (req, res) => {
  const ISO_8601_OFFSET = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  const timestamp = moment().format(ISO_8601_OFFSET);
  const secret = process.env.API_SIGNATURE_SECRET;
  const httpMethod = 'POST';
  const relativeUrl = req.url;
  const sha256body = SHA256(JSON.stringify(req.body))
  const stringToSign = `${httpMethod}:${relativeUrl}:${sha256body}:${timestamp}`
  const sha256digest = HmacSHA256(stringToSign, secret);
  console.log(process.env.API_SIGNATURE_SECRET);
  let config = {
    method: 'POST',
    url: `${process.env.API_URL}/api/v1/users/login`,
    headers: {
      'X-REQUEST-ID': uuid.v4(), 
      'X-TIMESTAMP': timestamp,  
      'X-CHANNEL-ID': 'ANDROID001', 
      'X-SIGNATURE': sha256digest.toString(),
      'X-DEVICE-ID': '', 
      'X-DEVICE-INFO': '', 
      'Content-Type': 'application/json'
    },
    data: req.body
  }


  axios.request(config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(config)
      res.status(400).json(error?.response?.data)
    })
})

app.listen(5001, () => console.log("Backend server is running!"));

module.exports = app;