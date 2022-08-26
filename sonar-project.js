/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000/',
    token: 'token',
    options: {},
  },
  () => {
  },
);
