var axios = require('axios');

var api;

    api = axios.create({
        baseURL: 'http://localhost:3030/', //10.0.0.103 - teste em dispositivos em rede
    });

module.exports = api;