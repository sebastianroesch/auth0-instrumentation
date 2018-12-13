const appmetrics = require('appmetrics');
const agent = require('./index.js');

appmetrics.configure({
  mqtt: 'off',
  profiling: 'off'
});

agent.init({name: 'test'}, process.env);
agent.metrics.startRuntimeCollection(appmetrics);

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
