var axios = require('axios');

var api = axios.create({
  baseURL: 'http://localhost:3030/',
  /* other custom settings */
});

module.exports = api;